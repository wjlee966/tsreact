// import Counter from './Counter';
// import InputSample from './InputSample';
import { useCallback, useMemo, useReducer, useRef, useState } from 'react';
import CreateUser from './CreateUser';
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
    case 'CHANGE_INPUT':
      return { ...state, inputs: { ...state.inputs, [action.name]: action.value } };

    case 'CREATE_USER':
      return { inputs: initialState.inputs, users: [...state.users, action.user] };
    // return { inputs: initialState.inputs, users: state.users.concat(action.user) };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case 'REMOVE_USER':
      return { ...state, users: state.users.filter(user => user.id !== action.id) };
    default:
      throw new Error(`Unhandled action: ${action.type}`);
  }
};

const initialState = {
  inputs: {
    username: '',
    email: '',
  },
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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const nameInput = useRef();
  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE_INPUT', name, value });
  }, []);

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
  }, [email, username]);

  const onRemove = useCallback(id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    dispatch({ type: 'REMOVE_USER', id });
  }, []);

  // 이 함수들은 컴포넌트가 리렌더링 될 때 마다 새로 만들어집니다.
  // 함수를 선언하는 것 자체는 사실 메모리도, CPU 도
  // 리소스를 많이 차지 하는 작업은 아니기 때문에
  // 함수를 새로 선언한다고 해서 그 자체 만으로 큰 부하가 생길일은 없지만,
  // 한번 만든 함수를 필요할때만 새로 만들고 재사용하는 것은 여전히 중요합니다.

  // 주의 하실 점은, 함수 안에서 사용하는 상태 혹은 props 가 있다면 꼭,
  // deps 배열안에 포함시켜야 된다는 것 입니다.
  // 만약에 deps 배열 안에 함수에서 사용하는 값을 넣지 않게 된다면,
  // 함수 내에서 해당 값들을 참조할때 가장 최신 값을 참조 할 것이라고 보장 할 수 없습니다.
  // props 로 받아온 함수가 있다면, 이 또한 deps 에 넣어주어야 해요.

  // 사실, useCallback 은 useMemo 를 기반으로 만들어졌습니다.
  // 다만, 함수를 위해서 사용 할 때 더욱 편하게 해준 것 뿐이지요.
  // 이런식으로도 표현 할 수 있습니다.

  // const onToggle = useMemo(
  //   () => () => {
  //     /* ... */
  //   },
  //   [users]
  // );
  const onToggle = useCallback(id => {
    dispatch({ type: 'TOGGLE_USER', id });
  }, []);

  // useMemo 의 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수를 넣어주면 되고
  // 두번째 파라미터에는 deps 배열을 넣어주면 되는데,
  // 이 배열 안에 넣은 내용이 바뀌면, 우리가 등록한 함수를 호출해서 값을 연산해주고,
  // 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 됩니다.
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
        nameInput={nameInput}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>{`활성 사용자 수 : ${count}`}</div>
    </>
  );
}

export default App;
