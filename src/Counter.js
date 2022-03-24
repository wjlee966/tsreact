import React, { useReducer } from 'react';

const reducer = (state, action) => {
  // 새로운 상태를 만드는 로직
  // const nextState = ...
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      throw new Error(`Unhandled action: ${action.type}`);
  }
};

const Counter = () => {
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => dispatch({ type: 'INCREASE' });
  const onDecrease = () => dispatch({ type: 'DECREASE' });

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
};

export default Counter;
