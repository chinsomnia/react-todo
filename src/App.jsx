import './App.css'

function App() {
  let todoList = [{
    id: 1,
    title: 'Laundry',
  }, {
    id: 2,
    title: 'Vacuum',
  }, {
    id: 3,
    title: 'Take out trash',
  }];

  return (
    <>
      <h1>Todo List</h1>
      <ul className='list'>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  )
}

export default App
