import { createContext, useContext, useReducer } from 'react';

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE':
      return { count: state.count + 1 };
    case 'DECREASE':
      return { count: state.count - 1 };
    default:
      throw new Error(`Unhandled action: ${action.type}`);
  }
};

const CounterStateContext = createContext();
const CounterDispatchContext = createContext();

export const CounterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <CounterStateContext.Provider value={state}>
      <CounterDispatchContext.Provider value={dispatch}>{children}</CounterDispatchContext.Provider>
    </CounterStateContext.Provider>
  );
};

export const useCounterState = () => {
  const context = useContext(CounterStateContext);
  if (!context) throw new Error("Can't find CounterStateContext.Provider");
  return context;
};

export const useCounterDispatch = () => {
  const context = useContext(CounterDispatchContext);
  if (!context) throw new Error("Can't find CounterDispatchContext.Provider");
  return context;
};
