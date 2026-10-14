import { useEffect, useState } from 'react'

import DeleteConfirm from './components/delete-confirm'
import TaskItem from './components/task-item'
import './App.css'
import AddTodo from './components/add-todo'
import { useTaskStore } from './store/useTaskStore'

function App() {
  const title="My Todo  App";
   const tasks=useTaskStore((state)=>state.tasks)
useEffect(()=>{localStorage.setItem('tasks',JSON.stringify(tasks))},[tasks]);
  return (
    <>
      <section id="center"className='todo-app'>
        <div className='todo-header'>
          <h1>{title}</h1>
        <p>Organize your daily tasks</p>
        </div>
       <TaskItem/>
       <AddTodo/>
      </section>

    </>
  )
}

export default App
