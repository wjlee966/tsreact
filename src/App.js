// import Counter from './Counter';
// import InputSample from './InputSample';
import { useMemo } from 'react';
import CreateUser from './CreateUser';
import { useInputState } from './InputContext';
import UserList from './UserList';

const countActiveUsers = users => {
  console.log('활성 사용자 수를 세는 중...');
  return users.filter(user => user.active).length;
};

function App() {
  const state = useInputState();

  const { users } = state;

  // useMemo 의 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수를 넣어주면 되고
  // 두번째 파라미터에는 deps 배열을 넣어주면 되는데,
  // 이 배열 안에 넣은 내용이 바뀌면, 우리가 등록한 함수를 호출해서 값을 연산해주고,
  // 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 됩니다.
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser />
      <UserList />
      <div>{`활성 사용자 수 : ${count}`}</div>
    </>
  );
}

export default App;
