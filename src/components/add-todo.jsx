import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
export default function AddTodo(){
const [newTask,setNewTask]=useState("");
const addTasks=useTaskStore((state)=>state.addTasks)

function handelAdd(e){
    e.preventDefault()
    if(!newTask.trim())return
    addTasks(newTask.trim())
    setNewTask("")
}
return (
    <form className="add-row" onSubmit={handelAdd}>
        <input className="task-input" value={newTask}  
        onChange={(e)=>setNewTask(e.target.value)}
        placeholder="add new task .."
        >
        </input>
        <button className="add-btn" type="submit">
            Add
        </button>
    </form>
)
}