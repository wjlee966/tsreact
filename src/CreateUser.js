import React from 'react';

const CreateUser = ({ username, email, onChange, onCreate, nameInput }) => {
  return (
    <div>
      <input name='username' placeholder='' onChange={onChange} value={username} ref={nameInput} />
      <input name='email' placeholder='' onChange={onChange} value={email} />
      <button onClick={onCreate}>등록</button>
    </div>
  );
};

export default CreateUser;
