import "./App.css";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAscending, setIsAscending] = useState(true);

  const fetchData = async (todo) => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${
      import.meta.env.VITE_TABLE_NAME
    }?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      let todos = data.records.map((todo) => {
        const existingTodo = {
          title: todo.fields.title,
          id: todo.id,
        };
        return existingTodo;
      });
      
      if (isAscending) {
        todos.sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title == b.title) {
            return 0;
          }
          return 1;
        });
      } else {
        todos.sort((b, a) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title == b.title) {
            return 0;
          }
          return 1;
        });
      }
      setIsAscending(!isAscending);
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

  const addTodo = async (newTodo) => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: { title: newTodo.title },
      }),
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
      const id = data.id;
      setTodoList([...todoList, { title: newTodo.title, id }]);
    } catch (error) {
      console.log(error.message);
    }
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
            <div>
              <h1>Self-Care</h1>
              <h2>Todo List</h2>
              <AddTodoForm onAddTodo={addTodo} />
              <div className="flex">
                <p>Sort:</p>
                <button
                  className="smallButton"
                  onClick={() => {
                    isAscending ? setIsAscending(false) : setIsAscending(true);
                    fetchData()
                    setIsLoading(true);
                  }}
                >
                  {isAscending ? "a-z" : "z-a"}
                </button>
              </div>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              )}
            </div>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
