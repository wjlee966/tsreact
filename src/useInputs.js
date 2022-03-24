import { useCallback, useReducer } from 'react';

// EXERCISE #1. useState 대신 useReducer 로 구현할 것!
const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return { ...state, [action.name]: [action.value] };
    case 'RESET':
      return action.initialForm;
    default:
      throw new Error(`Unhandled action: ${action.type}`);
  }
};

const useInputs = initialForm => {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE_INPUT', name, value });
  }, []);

  const reset = useCallback(() => dispatch({ type: 'RESET', initialForm }), [initialForm]);

  return [state, onChange, reset];
};

export default useInputs;
