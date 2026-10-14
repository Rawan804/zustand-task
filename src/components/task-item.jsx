import {useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import DeleteConfirm from "./delete-confirm";

export default function TaskItem(){
    const tasks=useTaskStore((state)=>state.tasks)
    const deleteTask=useTaskStore((state)=>state.deleteTask)
    const toogleTask=useTaskStore((state)=>state.toogleTask)
    const editTask=useTaskStore((state)=>state.editTask)
    const[editingIndex,setEditingIndex]=useState(null)
    const [editText,setEditText]=useState("")
    const[taskToDelete,setTaskToDelete]=useState(null)
    const completedCount=tasks.filter((task)=>task.completed).length
    const remCount=tasks.length-completedCount
    return(
        <div className="task-list">
      
            {
                tasks.map((task,index)=>(
                    <div className="task-item" key={`${task.text}-${index}`}>
                       <input
  type="checkbox"
  className="task-checkbox"
  checked={task.completed}
  onChange={() => toogleTask(index)}
  aria-label="completed task"
/>
                        {editingIndex===index?(
                            <input className="task input task-edit-input"
                            value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                            autoFocus
                            />):(<span className="task-text" 
                          style={{
                            textDecoration:task.completed?'line-through' : 'none',
                            cursor:'pointer'
                        }}
                        onDoubleClick={()=>
                        {
                            setEditingIndex(index)
                            setEditText(task.text)
                        }
                        }
                        >{task.text}</span>)}
                  <div className="task-actions">
                  {editingIndex === index ? (
                   <>
                <button
                  className="save-btn"
                  onClick={() => {
                    if (editText.trim()) {
                      editTask(index, editText.trim())
                      setEditingIndex(null)
                      setEditText('')
                    }
                  }}
                >
                  ✓
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => {
                    setEditingIndex(null)
                    setEditText('')
                  }}
                >
                  ✕
                </button>
              </>
            ) : (
              <>
  
<button
  className="edit-btn"
  onClick={() => {
    setEditingIndex(index)
    setEditText(task.text)
  }}
  aria-label="Edit task"
  title="Edit task"
>
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
  </svg>
</button>
    
<button
  className="delete-btn"
  onClick={() => setTaskToDelete(index)}
  aria-label="Delete task"
  title="Delete task"
>
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v5" />
    <path d="M14 11v5" />
  </svg>
</button>

              </>
            )}
          </div>
        </div>
      ))}
            {tasks.length===0?(
                <p className="empty">No task yet</p>):(
                    <>
            <div className="tasks-count">
                <span> completed:{completedCount}</span>
                <span> remaining:{remCount}</span>
            </div>
</>)}
      {taskToDelete !== null && (
        <DeleteConfirm
          onConfirm={() => {
            deleteTask(taskToDelete)
            setTaskToDelete(null)
          }}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </div>
            
     
  );
}