import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../components/Post';
import { reducerUtils } from '../lib/asyncUtils';
import { getPost, goToHome } from '../modules/posts';

const PostContainer = ({ postId }) => {
  const { data, loading, error } = useSelector(
    /*
    {
      posts: {
        data,
        loading,
        error
      },
      post: {
        data,
        loading,
        error,
      }
    }
    */
    /*
    {
      posts: {
        data,
        loading,
        error
      },
      post: {
        '1': {
          data,
          loading,
          error
        },
        '2': {
          data,
          loading,
          error
        },
        [id]: {
          data,
          loading,
          error
        }
      }
    }
    */
    // 아예 데이터가 존재하지 않을 때가 있으므로 비구조화 할당이 오류나지 않도록
    state => state.posts.post[postId] || reducerUtils.initial()
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) return; // 포스트가 존재하면 아예 요청을 하지 않음
    dispatch(getPost(postId));
    /*
    return () => {
      // 특정 포스트 조회시 재로딩 이슈 #1
      // 이렇게 해주면, 포스트 페이지에서 떠날때마다 포스트를 비우게 되므로,
      // 다른 포스트를 읽을 때 이전 포스트가 보여지는 문제가 해결되버립니다.
      // 이 방법은 충분히 편하고, 쉽기도 하지만, 한가지 아쉬운점이 있습니다.

      // 바로, 이미 읽었던 포스트를 불러오려고 할 경우에도 새로 요청을 한다는 것이죠.
      dispatch(clearPost());
    };
    */
  }, [data, dispatch, postId]);

  if (loading && !data) return <div>로딩중...</div>; // 로딩중이고 데이터가 없을 때만
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <>
      <button onClick={() => dispatch(goToHome())}>홈으로 이동</button>
      <Post post={data} />
    </>
  );
};

export default PostContainer;
