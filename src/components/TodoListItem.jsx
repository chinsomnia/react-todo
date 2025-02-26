import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

function TodoListItem({ item, onRemoveTodo, onCheckInput }) {
  const handleRemoveItem = () => onRemoveTodo(item.id);
  const handleCheck = (e) => {
    onCheckInput(item.id, e.target.checked);
  };

  return (
    <li className={style.ListItem}>
      <input
        type="checkbox"
        defaultChecked={item.completedAt}
        onChange={handleCheck}
        className={style.checkInput}
      />
      {item.title}
      <button onClick={handleRemoveItem}>Remove</button>
    </li>
  );
}

TodoListItem.propTypes = {
  item: PropTypes.object,
  onRemoveTodo: PropTypes.func,
  onCheckInput: PropTypes.func,
};

export default TodoListItem;
