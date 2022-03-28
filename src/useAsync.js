import { useCallback, useEffect, useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, data: null, error: null };
    case 'SUCCESS':
      return { loading: false, data: action.data, error: null };
    case 'ERROR':
      return { loading: false, data: null, error: action.error };

    default:
      throw new Error(`Unhandled action: ${action.type}`);
  }
};

export default function useAsync(callback, deps = [], skip) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = useCallback(async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await callback();
      dispatch({ type: 'SUCCESS', data }); // 데이터는 response.data 안에 들어있습니다.
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  }, [callback]);

  useEffect(() => {
    if (skip) return;
    fetchData();
    // eslint 설정을 다음 줄에서만 비활성화
    // eslint-disable-next-line
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [state, fetchData];
}
