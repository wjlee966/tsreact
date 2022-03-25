import React, { useCallback } from 'react';
import { useInputDispatch, useInputNameInput, useInputNextId } from './InputContext';
import useInputs from './useInputs';

// EXERCISE #2. useContext 를 사용, CreateUser.js 에서 onCreate 와 onChange (useInputs.js) 관리
const CreateUser = () => {
  console.log('CreateUser');

  const [form, onChange, reset] = useInputs({ username: '', email: '' });
  const dispatch = useInputDispatch();
  const nameInput = useInputNameInput();
  const { username, email } = form;

  const nextId = useInputNextId();

  const onCreate = useCallback(() => {
    dispatch({ type: 'CREATE_USER', user: { id: nextId.current, username, email } });

    nameInput.current.focus();
    console.log(nextId);
    nextId.current += 1;
    reset();
  }, [dispatch, email, nameInput, nextId, reset, username]);

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
