import React, { useRef, useState } from 'react';

// 컴포넌트 최적화를 위하여 React.memo를 사용합니다
const TodoItem = React.memo(({ todo, onToggle }) => (
  <li
    style={{
      textDecoration: todo.done ? 'line-through' : 'none',
      color: todo.done ? 'gray' : 'black',
      cursor: 'pointer',
    }}
    onClick={() => onToggle(todo.id)}
  >
    {todo.text}
  </li>
));

// 컴포넌트 최적화를 위하여 React.memo를 사용합니다
const TodoList = React.memo(({ todos, onToggle }) => (
  <ul>
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
    ))}
  </ul>
));

const Todos = ({ todos, onCreate, onToggle }) => {
  // 리덕스를 사용한다고 해서 모든 상태를 리덕스에서 관리해야하는 것은 아닙니다.
  const [text, setText] = useState('');

  const todoInput = useRef();
  const onChange = e => setText(e.target.value);
  const onSubmit = e => {
    e.preventDefault(); // Submit 이벤트 발생했을 때 새로고침 방지
    onCreate(text);
    setText(''); // 인풋 초기화
    todoInput.current.focus();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          onChange={onChange}
          placeholder='할 일을 입력하세요...'
          value={text}
          ref={todoInput}
        />
        <button type='submit'>등록</button>
      </form>
      <TodoList todos={todos} onToggle={onToggle} />
    </div>
  );
};

// 컴포넌트 최적화를 위하여 React.memo를 사용합니다.
export default React.memo(Todos);
