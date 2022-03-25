import React, { useCallback, useContext, useRef } from 'react';
import { UserDispatch } from './App';
import useInputs from './useInputs';

// EXERCISE #2. useContext 를 사용, CreateUser.js 에서 onCreate 와 onChange (useInputs.js) 관리
const CreateUser = () => {
  console.log('CreateUser');

  const [form, onChange, reset] = useInputs({ username: '', email: '' });
  const dispatch = useContext(UserDispatch);
  const nameInput = useRef();
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
  }, [dispatch, email, reset, username]);

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
