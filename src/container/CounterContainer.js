import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Counter from '../components/Counter';
import { decrease, increase, setDiff } from '../modules/counter';

/* 컨테이너 컴포넌트 */
// 리덕스 스토어의 상태를 조회하거나,
// 액션을 디스패치 할 수 있는 컴포넌트를 의미합니다.
// 그리고 HTML 태그들을 사용하지 않고
// 다른 프리젠테이셔널 컴포넌트들을 불러와서 사용합니다.

const CounterContainer = ({ number, diff, increase, decrease, setDiff }) => {
  return (
    <div>
      <Counter
        // 상태와
        number={number}
        diff={diff}
        //액션을 디스패치하는 함수들을 props로 넣어줍니다.
        onIncrease={increase}
        onDecrease={decrease}
        onSetDiff={setDiff}
      />
    </div>
  );
};

// mapStateToProps 는 리덕스 스토어의 상태를 조회해서 어떤 것들을 props 로 넣어줄지 정의합니다.
// 현재 리덕스 상태를 파라미터로 받아옵니다.
const mapStateToProps = state => ({
  number: state.counter.number,
  diff: state.counter.diff,
});

// #1.
// mapDispatchToProps 는 액션을 디스패치하는 함수를 만들어서 props로 넣어줍니다.
// dispatch 를 파라미터로 받아옵니다.
// const mapDispatchToProps = dispatch => ({
//   onIncrease: () => dispatch(increase()),
//   onDecrease: () => dispatch(decrease()),
//   onSetDiff: diff => dispatch(setDiff(diff)),
// });
// #2.
// mapDispatchToProps 는 액션을 디스패치하는 함수를 만들어서 props로 넣어줍니다.
// dispatch 를 파라미터로 받아옵니다.
// const mapDispatchToProps = dispatch =>
//   // bindActionCreators 를 사용하면, 자동으로 액션 생성 함수에 dispatch 가 감싸진 상태로 호출 할 수 있습니다.
//   bindActionCreators(
//     {
//       increase,
//       decrease,
//       setDiff,
//     },
//     dispatch
//   );
// #3.
// mapDispatchToProps가 함수가 아니라 객체면
// bindActionCreators 를 connect 에서 대신 해줍니다.
const mapDispatchToProps = {
  increase,
  decrease,
  setDiff,
};

// connect 함수에는 mapStateToProps, mapDispatchToProps 를 인자로 넣어주세요.
export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

/* 위 코드는 다음과 동일합니다.
  const enhance = connect(mapStateToProps, mapDispatchToProps);
  export default enhance(CounterContainer);
*/
