import "./App.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { useEffect, useState } from "react";

const savedTodoList = localStorage.getItem("savedTodoList");
const initialList = savedTodoList ? JSON.parse(savedTodoList) : [];

const useSemiPersistentState = () => {
  const [todoList, setTodoList] = useState(initialList);

  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
};

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </>
  );
}

export default App;