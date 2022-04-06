// 미들웨어는 결국 하나의 함수입니다.
// 아래 미들웨어는 익명 함수를 연달아서 두 번 리턴하는 함수
/*
const middleware = store => next => action => {
  // to do something...
}

function middleware(store) {
  return function (next) {
    return function (action) {
      // to do something...
    };
  };
};
*/
const myLogger = store => next => action => {
  console.log(action); // 먼저 액션을 출력합니다.
  const result = next(action); // 다음 미들웨어 (또는 리듀서) 에게 액션을 전달합니다.
  console.log('\tNext: ', store.getState()); // 업데이트 이후의 상태를 조회합니다.
  return result; // 여기서 반환하는 값은 dispatch(action)의 결과물이 됩니다. 기본: undefined
};

export default myLogger;
