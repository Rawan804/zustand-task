import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { useTaskStore } from './store/useTaskStore'

function App() {
  const title="My Todo  App";
   const tasks=useTaskStore((state)=>state.tasks)
  const addTasks=useTaskStore((state)=>state.addTasks)
  const deleteTask=useTaskStore((state)=>state.deleteTask)
  const toogleTask=useTaskStore((state)=>state.toogleTask)
  const [newTask,setNewTask]=useState("");
useEffect(()=>{localStorage.setItem('tasks',JSON.stringify(tasks))},[tasks]);
  return (
    <>
      <section id="center"className='todo-app'>
        <div className='todo-header'>
          <h1>{title}</h1>
        <p>Organize your daily tasks</p>
        </div>
        <div className='task-list'>
  {tasks.map((task,index)=>
    (<div
         className={`task-item ${task.completed ? 'completed' : ''}`}
    key={`${task.text}-${index}`}>
    <span className="task-text">{task.text}</span>
       <div className="task-actions">
    <button
     type='button' 
     className="complete-btn"
     onClick={()=>toogleTask(index)}>

      {task.completed?'↶':'✓'}
    </button>
  <button 
    type='button' 
      className="delete-btn"
    onClick={()=>
     deleteTask(index)}>
      Delete
      </button>
      </div>
      </div>))}
        </div>
        <div className='add-row'>
        <input
         type='text' 
         className='task-input'
         placeholder='add new task'
         value={newTask} 
         onChange={(event)=>setNewTask(event.target.value)}>
         </input>
      <button
       type='button'
       className='add-btn'
       onClick={()=> newTask.trim ()!=="" ? 
        (addTasks(newTask.trim()),setNewTask('')):null } > 
      add tasks
      </button>
      </div>
      </section>

    </>
  )
}

export default App
