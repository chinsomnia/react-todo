function TodoListItem({ item, onRemoveTodo }) {
  const handleRemoveItem = () => onRemoveTodo(item.id);

  return (
    <li>
      {item.title}
      <button onClick={handleRemoveItem}>Remove</button>
    </li>
  );
}

export default TodoListItem;
