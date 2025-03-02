import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";
import style from "./TodoList.module.css";

function TodoList({ todoList, onRemoveTodo, onCheckInput }) {
  return (
    <div className={style.listContainer}>
      <div className={style.listContent}>
        <ul className="list">
          {todoList.map((todo) => (
            <TodoListItem
              key={todo.id}
              item={todo}
              onRemoveTodo={onRemoveTodo}
              onCheckInput={onCheckInput}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

TodoList.proptypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
  onCheckInput: PropTypes.func,
};

export default TodoList;
