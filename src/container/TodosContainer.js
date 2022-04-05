import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import Todos from '../components/Todos';
import { addTodo, toggleTodo } from '../modules/todos';

const TodosContainer = ({ todos, addTodo, toggleTodo }) => {
  const onCreate = useCallback(text => addTodo(text), [addTodo]);
  const onToggle = useCallback(id => toggleTodo(id), [toggleTodo]); // 최적화를 위해 useCallback 사용

  console.log(todos);

  return (
    <>
      <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />
    </>
  );
};

// #1.
// const mapToStateProps = state => ({
//   todos: state.todos,
// });

// const mapDispatchToProps = {
//   addTodo,
//   toggleTodo,
// };

// export default connect(mapToStateProps, mapDispatchToProps)(TodosContainer);

// #2.
export default connect(
  state => ({
    todos: state.todos,
  }),
  { addTodo, toggleTodo }
)(TodosContainer);
