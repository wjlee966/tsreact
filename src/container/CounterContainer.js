import { useDispatch, useSelector } from 'react-redux';
import Counter from '../components/Counter';
import { decrease, increase, setDiff } from '../modules/counter';

/* 컨테이너 컴포넌트 */
// 리덕스 스토어의 상태를 조회하거나,
// 액션을 디스패치 할 수 있는 컴포넌트를 의미합니다.
// 그리고 HTML 태그들을 사용하지 않고
// 다른 프리젠테이셔널 컴포넌트들을 불러와서 사용합니다.

const CounterContainer = () => {
  // useSelector 는 리덕스 스토어의 상태를 조회하는 Hook입니다.
  // state 의 값은 store.getState() 함수를 호출했을 때
  // 나타나는 결과물과 동일합니다.
  const { number, diff } = useSelector(state => ({
    number: state.counter.number,
    diff: state.counter.diff,
  }));

  // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용할 수 있게 해주는 Hook 입니다.
  const dispatch = useDispatch();
  // 각 액션들을 디스패치하는 함수들을 만드세요.
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = diff => dispatch(setDiff(diff));

  return (
    <div>
      <Counter
        // 상태와
        number={number}
        diff={diff}
        //액션을 디스패치하는 함수들을 props로 넣어줍니다.
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onSetDiff={onSetDiff}
      />
    </div>
  );
};

export default CounterContainer;
