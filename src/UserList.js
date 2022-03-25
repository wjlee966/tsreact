import React, { useContext, useEffect } from 'react';
import { UserDispatch, UserState } from './App';

const User = React.memo(({ user }) => {
  const { username, email, id, active } = user;

  // User 컴포넌트에서 바로 dispatch 를 활용하기 위해,
  // useContext 라는 Hook 을 사용해서
  // 우리가 만든 UserDispatch Context 를 조회해야합니다.
  const dispatch = useContext(UserDispatch);

  useEffect(() => {
    console.log('user 가 바뀐 후');
    console.log(user);
    return () => {
      console.log('user 가 바뀌기 전');
      console.log(user);
    };
  }, [user]);

  return (
    <div>
      <b
        style={{
          color: active ? 'green' : 'black',
          cursor: 'pointer',
        }}
        onClick={() => dispatch({ type: 'TOGGLE_USER', id })}
      >
        {username}
      </b>{' '}
      <span>({email})</span>
      <button onClick={() => dispatch({ type: 'REMOVE_USER', id })}>삭제</button>
    </div>
  );
});

const UserList = ({ users }) => {
  return (
    <div>
      {users.map(user => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

// 렌더링 최적화 하지 않을 컴포넌트에 React.memo 를 사용하는것은,
// 불필요한 props 비교만 하는 것이기 때문에
// 실제로 렌더링을 방지할수있는 상황이 있는 경우에만 사용하시길바랍니다.

// 추가적으로, React.memo 에서 두번째 파라미터에
// propsAreEqual 이라는 함수를 사용하여 특정 값들만 비교를 하는 것도 가능합니다.
// 이걸 잘못사용한다면 오히려 의도치 않은 버그들이 발생하기 쉽습니다.

// 예를 들어서, 함수형 업데이트로 전환을 안했는데
// 이렇게 users 만 비교를 하게 된다면, onToggle 과 onRemove 에서
// 최신 users 배열을 참조하지 않으므로 심각한 오류가 발생 할 수 있습니다.
export default React.memo(UserList, (prevProps, nextProps) => nextProps.users === prevProps.users);
