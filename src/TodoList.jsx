import TodoListItem from "./TodoListItem";

function TodoList() {
    let todoList = [
        {
            id: 1,
            title: "Laundry",
        },
        {
            id: 2,
            title: "Vacuum",
        },
        {
            id: 3,
            title: "Take out trash",
        },
    ];

    return (
        <>
            <ul className="list">
                {todoList.map((todo) => (
                    <TodoListItem key={todo.id} item={todo}/>
                ))}
            </ul>
        </>
    );
}

export default TodoList;
