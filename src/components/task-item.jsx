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
                  className="complete-btn"
                  onClick={() => toogleTask(index)}
                >
                  {task.completed ? '↶' : '✓'}
                </button>

                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditingIndex(index)
                    setEditText(task.text)
                  }}
                >
                  ✎
                </button>

                <button
                  className="delete-btn"
                  onClick={() => setTaskToDelete(index)}
                >
                  🗑
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