import style from "./TodoListItem.module.css"
import PropTypes from "prop-types";

function TodoListItem({ item, onRemoveTodo }) {
  const handleRemoveItem = () => onRemoveTodo(item.id);

  return (
    <li className={style.ListItem}>
      {item.title}
      <button onClick={handleRemoveItem}>Remove</button>
    </li>
  );
}

TodoListItem.propTypes = {
  item: PropTypes.object,
  onRemoveTodo: PropTypes.func
}

export default TodoListItem;
