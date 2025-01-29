import "./App.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import NavBar from "./NavBar"
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (todo) => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      const todos = data.records.map((todo) => {
        const existingTodo = {
          title: todo.fields.title,
          id: todo.id,
        };
        return existingTodo;
      });

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  useEffect(() => {
    fetchData();
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
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Self-Care</h1>
              <h2>Todo List</h2>
              <AddTodoForm onAddTodo={addTodo} />
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              )}
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <h1>About</h1>
              <h5>
                Your go-to resource for creating and maintaining a personalized
                self-care routine.
              </h5>
              <h5>What you'll find here:</h5>
              <p>
                Tool to create your own self-care list: Easily organize your
                ideas and track your progress.
              </p>
              <h5>Benefits:</h5>

              <li>
                Increased awareness: By consciously creating a list, you become
                more mindful of your self-care needs.
              </li>
              <li>
                Improved focus: A list helps you prioritize and stay on track
                with your self-care goals.{" "}
              </li>
              <li>
                Reduced stress: Engaging in regular self-care activities can
                significantly reduce stress levels.
              </li>
              <li>
                Enhanced well-being: Prioritizing self-care contributes to
                improved physical and mental health.{" "}
              </li>
              <li>
                Increased self-compassion: A self-care list encourages you to be
                kind and compassionate towards yourself.
              </li>
              <p>
                A well-crafted self-care list can be a powerful tool for
                cultivating a happier and healthier you.{" "}
              </p>
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <h1>Get in Touch</h1>
              <p>
                I'd love to hear from you! Whether you have questions, feedback,
                or simply want to share your self-care journey, please don't
                hesitate to
              </p>
              <a href="https://github.com/chinsomnia/">Contact Me</a>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
