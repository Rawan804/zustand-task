import { create } from "zustand";

const defaultTasks=['']

const getInitialTasks=()=>{
    const savedTasks=localStorage.getItem('tasks')
    return savedTasks?JSON.parse(savedTasks):defaultTasks
}
export const useTaskStore=create((set)=>({
    tasks:getInitialTasks(),
    addTasks:(text)=>set((state)=>
        ({tasks:[...state.tasks,{text,completed:false}]})),

    deleteTask:(index)=>set((state)=>
        ({tasks:state.tasks.filter((_,currentIndex)=>currentIndex!==index)})),

    toogleTask:(index)=>set((state)=>
        ({tasks:state.tasks.map((tasks,currentIndex)=>currentIndex===index?
            {...tasks,completed:!tasks.completed}:tasks)}))
}))

