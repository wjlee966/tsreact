import React, { useState } from 'react';
import User from './User';
import { getUsers, useUsersDispatch, useUsersState } from './UsersContext';

const Users = () => {
  const state = useUsersState();
  const dispatch = useUsersDispatch();
  const [userId, setUserId] = useState(null);

  const fetchData = () => {
    getUsers(dispatch);
  };

  const { loading, data: users, error } = state.users; // state.data 를 users 키워드로 조회

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!users) return <button onClick={fetchData}>다시 불러오기</button>;

  return (
    <>
      <ul>
        {users.map(user => (
          <li key={user.id} onClick={() => setUserId(user.id)} style={{ cursor: 'pointer' }}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchData}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
};

export default Users;
