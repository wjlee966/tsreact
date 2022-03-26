import { createContext, useContext, useReducer, useRef } from 'react';

const initialTodos = [
  {
    id: 1,
    text: '프로젝트 생성하기',
    done: true,
  },
  {
    id: 2,
    text: '컴포넌트 스타일링 하기',
    done: true,
  },
  {
    id: 3,
    text: 'Context 만들기',
    done: false,
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false,
  },
];

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return [...state, action.todo];
    // return state.concat(action.todo);
    case 'TOGGLE':
      return state.map(todo => (todo.id === action.id ? { ...todo, done: !todo.done } : todo));
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action: ${action.type}`);
  }
};

// 프로젝트의 규모가 커지게 된다면 최상위 컴포넌트인 App 에서
// 모든 상태 관리를 하기엔 App 컴포넌트의 코드가 너무 복잡해질 수도 있고,
// props 를 전달해줘야 하는 컴포넌트가 너무 깊숙히 있을 수도 있습니다
// (여러 컴포넌트를 거쳐서 전달해야 하는 경우를 의미합니다)

// 만약 Context API 를 활용한다면 다음과 같이 구현 할 수 있습니다.

// 우리는 하나의 Context 를 만들어서 state 와 dispatch 를 함께 넣어주는 대신에,
// 두개의 Context 를 만들어서 따로 따로 넣어줄 것입니다.
// 이렇게 하면 dispatch 만 필요한 컴포넌트에서
// 불필요한 렌더링을 방지 할 수 있습니다.
// 추가적으로, 사용하게 되는 과정에서 더욱 편리하기도 합니다.
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>{children}</TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

// 우리는 컴포넌트에서 useContext 를 직접 사용하는 대신에,
// useContext 를 사용하는 커스텀 Hook 을 만들어서 내보내주겠습니다.

// Hook 을 사용하려면, 해당 컴포넌트가 TodoProvider 컴포넌트 내부에 렌더링되어 있어야 합니다
// (예: App 컴포넌트에서 모든 내용을 TodoProvider 로 감싸기).
// 만약 TodoProvider 로 감싸져있지 않다면
// 에러를 발생시키도록 커스텀 Hook 을 수정해보겠습니다.
export const useTodoState = () => {
  const context = useContext(TodoStateContext);
  if (!context) throw new Error("Can't find TodoStateContext.Provider");
  return context;
};

export const useTodoDispatch = () => {
  const context = useContext(TodoDispatchContext);
  if (!context) throw new Error("Can't find TodoDispatchContext.Provider");
  return context;
};

export const useTodoNextId = () => {
  const context = useContext(TodoNextIdContext);
  if (!context) throw new Error("Can't find TodoNextIdContext.Provider");
  return context;
};
