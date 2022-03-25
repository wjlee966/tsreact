import React from 'react';
import { useCounterDispatch, useCounterState } from './CounterContext';

const Counter = () => {
  const state = useCounterState();
  const dispatch = useCounterDispatch();

  const onIncrease = () => dispatch({ type: 'INCREASE' });
  const onDecrease = () => dispatch({ type: 'DECREASE' });

  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
};

export default Counter;
