import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul className="list">
      {todoList.map((todo) => (
        <TodoListItem key={todo.id} item={todo} onRemoveTodo={onRemoveTodo} />
      ))}
    </ul>
  );
}

TodoList.proptypes = {
  todoList: PropTypes,
  onRemoveTodo: PropTypes.func
}

export default TodoList;
