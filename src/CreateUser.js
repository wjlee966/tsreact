import React from 'react';

const CreateUser = ({ username, email, onChange, onCreate, nameInput }) => {
  console.log('CreateUser');
  return (
    <div>
      <input name='username' placeholder='' onChange={onChange} value={username} ref={nameInput} />
      <input name='email' placeholder='' onChange={onChange} value={email} />
      <button onClick={onCreate}>등록</button>
    </div>
  );
};

// 컴포넌트의 props 가 바뀌지 않았다면,
// 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화를 해줄 수 있는
// React.memo 라는 함수에 대해서 알아보겠습니다
export default React.memo(CreateUser);
