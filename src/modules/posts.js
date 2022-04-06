/* posts 리덕스 모듈 준비하기 */

// 프로미스를 다루는 리덕스 모듈을 다룰 땐 다음과 같은 사항을 고려해야합니다.

// 1. 프로미스가 시작, 성공, 실패했을때 다른 액션을 디스패치해야합니다.
// 2. 각 프로미스마다 thunk 함수를 만들어 주어야 합니다.
// 3. 리듀서에서 액션에 따라 로딩중, 결과, 에러 상태를 변경해 주어야 합니다.
import * as postsAPI from '../api/posts'; // api/posts 안의 함수 모두 불러오기
import { createPromiseThunk, handleAsyncActions, reducerUtils } from '../lib/asyncUtils';

/* 액션 타입 */

// 포스트 여러 개 조회하기
const GET_POSTS = 'posts/GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'posts/GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'posts/GET_POSTS_ERROR'; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'posts/GET_POST'; // 요청 시작
const GET_POST_SUCCESS = 'posts/GET_POST_SUCCESS'; // 요청 성공
const GET_POST_ERROR = 'posts/GET_POST_ERROR'; // 요청 실패

// 특정 포스트 조회시 재로딩 이슈 #1
// 포스트 비우기
const CLEAR_POST = 'posts/CLEAR_POST';

// 리팩토링 #1:createPromiseThunk
// thunk를 사용할 때 꼭 모든 액션들에 대하여 액션 생성 함수를 만들 필요는 없습니다.
// 그냥 thunk 함수에서 바로 액션 객체를 만들어 주어도 괜찮습니다.
// export const getPosts = () => async dispatch => {
//   dispatch({ type: GET_POSTS }); // 요청이 시작됨
//   try {
//     const posts = await postsAPI.getPosts(); // API를 호출
//     dispatch({ type: GET_POSTS_SUCCESS, posts }); //  성공
//   } catch (e) {
//     dispatch({ type: GET_POSTS_ERROR, error: e }); // 실패
//   }
// };

// thunk 함수에서도 파라미터를 받아와서 사용 할 수 있습니다.
// export const getPost = id => async dispatch => {
//   dispatch({ type: GET_POST }); // 요청이 시작됨
//   try {
//     const post = await postsAPI.getPostById(id); // API를 호출
//     dispatch({ type: GET_POST_SUCCESS, post }); //  성공
//   } catch (e) {
//     dispatch({ type: GET_POST_ERROR, error: e }); // 실패
//   }
// };

// 아주 쉽게 thunk 함수를 만들 수 있게 되었습니다.
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);

// 특정 포스트 조회시 재로딩 이슈 #1
export const clearPost = () => ({ type: CLEAR_POST });

// 리팩토링 #0:reducerUtils
// const initialState = {
//   posts: { loading: false, data: null, error: null },
//   post: { loading: false, data: null, error: null },
// };

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

// 리팩토링 #0:reducerUtils #2:handleAsyncActions
// export default function posts(state = initialState, action) {
//   switch (action.type) {
//     case GET_POSTS:
//       return { ...state, posts: reducerUtils.loading() };
//     case GET_POSTS_SUCCESS:
//       return { ...state, posts: reducerUtils.success(action.payload) }; // action.posts -> action.payload 로 변경됐습니다.
//     case GET_POSTS_ERROR:
//       return { ...state, posts: reducerUtils.error(action.error) };
//     case GET_POST:
//       return { ...state, post: reducerUtils.loading() };
//     case GET_POST_SUCCESS:
//       return { ...state, post: reducerUtils.success(action.payload) }; // action.post -> action.payload 로 변경됐습니다.
//     case GET_POST_ERROR:
//       return { ...state, post: reducerUtils.error(action.error) };
//     default:
//       return state;
//   }
// }

const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
const getPostReducer = handleAsyncActions(GET_POST, 'post');

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action);
    // return handleAsyncActions(GET_POSTS, 'posts')(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return getPostReducer(state, action);
    // return handleAsyncActions(GET_POST, 'post')(state, action);

    // 특정 포스트 조회시 재로딩 이슈 #1
    case CLEAR_POST:
      return { ...state, post: reducerUtils.initial() };
    default:
      return state;
  }
}
