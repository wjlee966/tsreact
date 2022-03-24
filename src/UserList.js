import React, { useEffect } from 'react';

const User = ({ user, onRemove, onToggle }) => {
  const { username, email, id, active } = user;

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
        onClick={() => onToggle(id)}
      >
        {username}
      </b>{' '}
      <span>({email})</span>
      <button onClick={() => onRemove(id)}>삭제</button>
    </div>
  );
};

const UserList = ({ users, onRemove, onToggle }) => {
  return (
    <div>
      {users.map(user => (
        <User key={user.id} user={user} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </div>
  );
};

export default UserList;
