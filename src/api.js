import axios from 'axios';

export const getUsers = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/users');
  return res.data;
};

export const getUser = async id => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  return res.data;
};
