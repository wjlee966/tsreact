// import Counter from './Counter';
// import InputSample from './InputSample';
import { createContext, useMemo, useReducer, useState } from 'react';
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

// UserDispatch 라는 이름으로 내보내줍니다.
export const UserDispatch = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;

  // useMemo 의 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수를 넣어주면 되고
  // 두번째 파라미터에는 deps 배열을 넣어주면 되는데,
  // 이 배열 안에 넣은 내용이 바뀌면, 우리가 등록한 함수를 호출해서 값을 연산해주고,
  // 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 됩니다.
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>{`활성 사용자 수 : ${count}`}</div>
    </UserDispatch.Provider>
  );
}

export default App;
