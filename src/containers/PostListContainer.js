import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../components/PostList';
import { getPosts } from '../modules/posts';

const PostListContainer = () => {
  const { data, loading, error } = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();

  // 컴포넌트 마운트 후 포스트 목록 요청
  useEffect(() => {
    // 포스트 목록 재로딩 이슈 #1
    // 만약 데이터가 이미 존재한다면 요청을 하지 않도록 하는 방법입니다.
    // if (data) return;

    dispatch(getPosts());
  }, [data, dispatch]);

  if (loading && !data) return <div>로딩중...</div>; // 로딩중이면서, 데이터가 없을 때에만 로딩중... 표시
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <>
      <PostList posts={data} />
    </>
  );
};

export default PostListContainer;
