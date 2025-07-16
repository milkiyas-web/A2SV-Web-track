import React, { useEffect, useState } from 'react'
import type { Todo } from './lib/types'
import "./index.css"
const App = () => {
  const [value, setValue] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Todo[];
        setTodos(parsed);
      } catch (e) {
        console.error("Failed to parse todos:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleTaskAdd = () => {
    if (value.trim() == "") {
      return;
    }
    if (editingId != null) {
      const updated = todos.map((todo) =>
        todo.id == editingId ? { ...todo, taskName: value } : todo
      )
      setTodos(updated)
      setEditingId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        taskName: value,
        completed: false
      }
      setTodos([...todos, newTodo])
      setValue("")
    }
  }
  const handleDelete = (id: number) => {
    const updatedList = todos.filter((todo) => todo.id != id)
    setTodos(updatedList)
  }
  const handleEdit = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      setValue(todo.taskName);
      setEditingId(id)
    }
  }
  const toggleCompleted = (id: number) => {
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated)
  }
  const completedCount = todos.filter((t) => t.completed).length;
  const total = todos.length;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className='app-container'>
      <div className='section'>
        <input name="task" type='text' value={value} onChange={(e) => setValue(e.target.value)} placeholder='Enter a task' />
        <button onClick={handleTaskAdd}>Add Task</button>
      </div>
      <div className='li-section'>
        <div style={{ margin: '20px 0' }}>
          <div style={{
            height: '20px',
            width: '100%',
            backgroundColor: '#eee',
            borderRadius: '5px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${percent}%`,
              backgroundColor: 'green',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <p>{percent}% completed</p>
        </div>

        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input name='complete' type="checkbox" checked={todo.completed} onChange={() => toggleCompleted(todo.id)} />
              <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.taskName}</span>
              <button className='' onClick={() => handleEdit(todo.id)}>✏️</button>
              <button className='' onClick={() => handleDelete(todo.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App