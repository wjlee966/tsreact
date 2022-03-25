// import Counter from './Counter';
// import InputSample from './InputSample';
import { createContext, useCallback, useMemo, useReducer, useRef, useState } from 'react';
import CreateUser from './CreateUser';
import useInputs from './useInputs';
import UserList from './UserList';

const countActiveUsers = users => {
  console.log('활성 사용자 수를 세는 중...');
  return users.filter(user => user.active).length;
};

// useReducer vs useState - 뭐 쓸까?
// 예를 들어서 컴포넌트에서 관리하는 값이 딱 하나고,
// 그 값이 단순한 숫자, 문자열 또는 boolean 값이라면
// 확실히 useState 로 관리하는게 편할 것입니다.

// 만약에 컴포넌트에서 관리하는 값이 여러개가 되어서
// 상태의 구조가 복잡해진다면 useReducer로
// 관리하는 것이 편해질 수도 있습니다.

// 저의 경우에는 setter 를 한 함수에서
// 여러번 사용해야 하는 일이 발생한다면
// 그 때부터 useReducer 를 쓸까? 에 대한 고민을 시작합니다.
const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return { users: [...state.users, action.user] };
    // return { users: state.users.concat(action.user) };
    case 'TOGGLE_USER':
      return {
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case 'REMOVE_USER':
      return { users: state.users.filter(user => user.id !== action.id) };
    default:
      throw new Error(`Unhandled action: ${action.type}`);
  }
};

const initialState = {
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: true,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ],
};

// UserState 라는 이름으로 내보내줍니다.
export const UserState = createContext(null);

// UserDispatch 라는 이름으로 내보내줍니다.
export const UserDispatch = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form, onChange, reset] = useInputs({ username: '', email: '' });
  const nameInput = useRef();
  const { users } = state;
  const { username, email } = form;

  const nextId = useRef(4);

  // 그런데, User 중 하나라도 수정하면 모든 User 들이
  // 리렌더링되고, CreateUser 도 리렌더링이 됩니다.

  // 왜 그런걸까요? 이유는 간단합니다.
  // users 배열이 바뀔때마다 onCreate 도 새로 만들어지고,
  // onToggle,onRemove 도 새로 만들어지기 때문입니다.
  // deps 에 users 가 들어있기 때문에 배열이 바뀔때마다 함수가 새로 만들어지는건, 당연합니다.

  // 그렇다면! 이걸 최적화하고 싶다면 어떻게해야 할까요?
  // 바로 deps 에서 users 를 지우고,
  // 함수들에서 현재 useState 로 관리하는 users 를 참조하지 않게 하는것입니다.
  // 그건 또 어떻게 할까요? 힌트는, useState 를 배울때 다뤘던 내용이에요.

  // 정답은 바로, 함수형 업데이트입니다.
  // 함수형 업데이트를 하게 되면, setUsers 에 등록하는 콜백함수의 파라미터에서
  // 최신 users 를 참조 할 수 있기 때문에 deps 에 users 를 넣지 않아도 된답니다.

  // 그럼 각 함수들을 업데이트 해주세요 (onChange 의 경우엔
  // 함수형 업데이트를 해도 영향은 가지 않지만, 연습삼아 해주겠습니다).
  // 이렇게 해주면, 특정 항목을 수정하게 될 때, 해당 항목만 리렌더링 될거예요.
  // console.log 찍어보시면 CreateUser 가 렌더링이 안되고 있는 것을 확인 할 수 있습니다.
  const onCreate = useCallback(() => {
    dispatch({ type: 'CREATE_USER', user: { id: nextId.current, username, email } });

    nameInput.current.focus();
    console.log(nextId);
    nextId.current += 1;
    reset();
  }, [email, reset, username]);

  // useMemo 의 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수를 넣어주면 되고
  // 두번째 파라미터에는 deps 배열을 넣어주면 되는데,
  // 이 배열 안에 넣은 내용이 바뀌면, 우리가 등록한 함수를 호출해서 값을 연산해주고,
  // 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 됩니다.
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserState.Provider value={state}>
      <UserDispatch.Provider value={dispatch}>
        <CreateUser
          username={username}
          email={email}
          onChange={onChange}
          onCreate={onCreate}
          nameInput={nameInput}
        />
        <UserList />
        <div>{`활성 사용자 수 : ${count}`}</div>
      </UserDispatch.Provider>
    </UserState.Provider>
  );
}

export default App;
