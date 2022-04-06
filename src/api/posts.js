import axios from 'axios';

// 참고: npx json-server --watch ./data.json --port 4000

// 포스트 목록을 가져오는 비동기 함수
export const getPosts = async () => {
  const res = await axios.get('/posts');
  return res.data;
};

// ID로 포스트를 조회하는 비동기 함수
export const getPostById = async id => {
  const res = await axios.get(`/posts/${id}`);
  return res.data;
};
