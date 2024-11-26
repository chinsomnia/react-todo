import TodoListItem from "./TodoListItem";

function TodoList({todoList}) {
  return (
    <>
      <ul className="list">
        {todoList.map((todo) => (
          <TodoListItem key={todo.id} item={todo} />
        ))}
      </ul>
    </>
  );
}

export default TodoList;
