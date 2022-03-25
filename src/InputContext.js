import { createContext, useContext, useReducer, useRef } from 'react';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return { users: [...state.users, action.user] };
    // return { users: state.users.concat(action.user) };
    case 'TOGGLE_USER':
      return {
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case 'REMOVE_USER':
      return { users: state.users.filter(user => user.id !== action.id) };
    default:
      throw new Error(`Unhandled action: ${action.type}`);
  }
};

const initialState = {
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: true,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    },
  ],
};

const InputStateContext = createContext();
const InputDispatchContext = createContext();
const InputNextIdContext = createContext();
const InputNameInputContext = createContext();

export const InputProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inputReducer, initialState);
  const nextId = useRef(4);
  const nameInput = useRef();

  return (
    <InputStateContext.Provider value={state}>
      <InputDispatchContext.Provider value={dispatch}>
        <InputNextIdContext.Provider value={nextId}>
          <InputNameInputContext.Provider value={nameInput}>
            {children}
          </InputNameInputContext.Provider>
        </InputNextIdContext.Provider>
      </InputDispatchContext.Provider>
    </InputStateContext.Provider>
  );
};

export const useInputState = () => {
  const context = useContext(InputStateContext);
  if (!context) throw new Error("Can't find InputStateContext.Provider");
  return context;
};

export const useInputDispatch = () => {
  const context = useContext(InputDispatchContext);
  if (!context) throw new Error("Can't find InputDispatchContext.Provider");
  return context;
};

export const useInputNextId = () => {
  const context = useContext(InputNextIdContext);
  if (!context) throw new Error("Can't find InputNextIdContext.Provider");
  return context;
};

export const useInputNameInput = () => {
  const context = useContext(InputNameInputContext);
  if (!context) throw new Error("Can't find InputNameInputContext.Provider");
  return context;
};
