import style from "./TodoListItem.module.css"

function TodoListItem({ item, onRemoveTodo }) {
  const handleRemoveItem = () => onRemoveTodo(item.id);

  return (
    <li className={style.ListItem}>
      {item.title}
      <button onClick={handleRemoveItem}>Remove</button>
    </li>
  );
}

export default TodoListItem;
