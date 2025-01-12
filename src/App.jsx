import "./App.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { useEffect, useState } from "react";
import TodoListItem from "./TodoListItem";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async(todo) => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    }

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`

    try {
      // const airtableData = {
      //   fields: {
      //     title: todo,
      //   },
      // };
  
      const response = await fetch(url, options);
  
      if (!response.ok) {      
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      const todos = data.records.map((todo) => {
        const existingTodo = {
          title: todo.fields.title,
          id: todo.id,
        }
        return existingTodo;
      })

      setTodoList(todos)
      setIsLoading(false)
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
  
  useEffect(() => {
    fetchData()
    // new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     const savedTodoList = localStorage.getItem("savedTodoList");
    //     const initialList = savedTodoList ? JSON.parse(savedTodoList) : [];
    //     resolve({
    //       data: {
    //         todoList: initialList,
    //       },
    //     });
    //   }, 2000);
    // }).then((result) => {
    //   setTodoList(result.data.todoList);
    //   setIsLoading(false);
    // });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    const updatedList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedList);
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}

export default App;
