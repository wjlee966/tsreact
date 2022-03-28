import axios from 'axios';
import { createContext, useContext, useReducer } from 'react';

// UsersContext 에서 사용 할 기본 상태
const initialState = {
  users: { loading: false, data: null, error: null },
  user: { loading: false, data: null, error: null },
};

// 로딩중일 때 바뀔 상태 객체
const loadingState = { loading: true, data: null, error: null };

// 성공했을 때의 상태 만들어주는 함수
const success = data => ({ loading: false, data, error: null });

// 실패했을 때의 상태 만들어주는 함수
const error = e => ({ loading: false, data: null, error: e });

// 위에서 만든 객체 / 유틸 함수들을 사용하여 리듀서 작성
const usersReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return { ...state, users: loadingState };
    case 'GET_USERS_SUCCESS':
      return { ...state, users: success(action.data) };
    case 'GET_USERS_ERROR':
      return { ...state, users: error(action.error) };
    case 'GET_USER':
      return { ...state, user: loadingState };
    case 'GET_USER_SUCCESS':
      return { ...state, user: success(action.data) };
    case 'GET_USER_ERROR':
      return { ...state, user: error(action.error) };
    default:
      throw new Error(`Unhandled action: ${action.type}`);
  }
};

// State 용 Context 와 Dispatch 용 Context 따로 만들어주기
const UsersStateContext = createContext();
const UsersDispatchContext = createContext();

// 위에서 선언한 두가지 Context 들의 Provider 로 감싸주는 컴포넌트
export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  return (
    <UsersStateContext.Provider value={state}>
      <UsersDispatchContext.Provider value={dispatch}>{children}</UsersDispatchContext.Provider>
    </UsersStateContext.Provider>
  );
};

// State 를 쉽게 조회 할 수 있게 해주는 커스텀 Hook
export const useUsersState = () => {
  const state = useContext(UsersStateContext);
  if (!state) throw new Error("Can't find UsersStateContext.Provider");
  return state;
};

// Dispatch 를 쉽게 사용 할 수 있게 해주는 커스텀 Hook
export const useUsersDispatch = () => {
  const dispatch = useContext(UsersDispatchContext);
  if (!dispatch) throw new Error("Can't find UsersDispatchContext.Provider");
  return dispatch;
};

export const getUsers = async dispatch => {
  dispatch({ type: 'GET_USERS' });
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    dispatch({ type: 'GET_USERS_SUCCESS', data: res.data });
  } catch (e) {
    dispatch({ type: 'GET_USERS_ERROR', error: e });
  }
};

export const getUser = async (dispatch, id) => {
  dispatch({ type: 'GET_USER' });
  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({ type: 'GET_USER_SUCCESS', data: res.data });
  } catch (e) {
    dispatch({ type: 'GET_USER_ERROR', error: e });
  }
};
