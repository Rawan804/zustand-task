import { create } from "zustand";


const getInitialTasks = () => {
  const savedTasks = localStorage.getItem('tasks')

  if (!savedTasks) {
    return []
  }
  try {
    const parsedTasks = JSON.parse(savedTasks)
    return Array.isArray(parsedTasks)
      ? parsedTasks.filter(
          (task) => task && task.text?.trim() !== ''  )  : []
  } catch {
    return []
  }
}
export const useTaskStore=create((set)=>({
    tasks:getInitialTasks(),
    addTasks:(text)=>set((state)=>
        ({tasks:[...state.tasks,{text,completed:false}]})),

    deleteTask:(index)=>set((state)=>
        ({tasks:state.tasks.filter((_,currentIndex)=>currentIndex!==index)})),

    toogleTask:(index)=>set((state)=>
        ({tasks:state.tasks.map((tasks,currentIndex)=>currentIndex===index?
            {...tasks,completed:!tasks.completed}:tasks)})),
            editTask:(index,newText)=>set((state)=>({
              tasks:state.tasks.map((task,currentIndex)=>
                currentIndex===index?{...task,text:newText}:task
              )
            }))
}))

