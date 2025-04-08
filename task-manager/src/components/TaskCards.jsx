import React from 'react'
import {useState} from "react"
import Modal from "./Modal.jsx"

function TaskCards({listOfTasks}) {
    const { savedTasks, setSavedTasks } = listOfTasks || { savedTasks: [], setSavedTasks: () => {} };

    const features = ["Complete" ,"Update" , "Delete"];
    const [taskEditing , setTaskEditing] = useState(null);
    const [taskEdited , setTaskEdited] = useState({title:"" , description:""})
    const [deletedTask , setDeletedTask]  = useState(null);
    const [showToast , setShowToast]  = useState(false);
    const [undoTimer , setUndoTimer] = useState(null);
    const [deletedIndex , setDeletedIndex] = useState(null);
      const handleFunctionality = (currentTab , feature)=>{
        
       if(feature === "Complete"){
        let completedTask = savedTasks.map((task , index)=>index === currentTab ? {...task , status: task.status ===  "pending" ? "completed" : "pending" } : task);
        setSavedTasks(completedTask);
        localStorage.setItem("tasks" , JSON.stringify(completedTask));
       }
       else if(feature === "Update"){
        setTaskEditing(currentTab);
        setTaskEdited(savedTasks[currentTab]);
       }
      else if(feature === "Delete"){
    const confirmedDelete  = window.confirm("Are you sure this action can not be undo");
    const deleted = savedTasks[currentTab] ;
    setDeletedIndex(currentTab);
    setDeletedTask(deleted);
    setShowToast(true);
    
      if(confirmedDelete){
          const unDeletedTasks= savedTasks.filter((task , index)=>{
           return index !== currentTab ;});
            setSavedTasks(unDeletedTasks);
            startTimer();
       localStorage.setItem("tasks" , JSON.stringify(unDeletedTasks));
      } }
      
    
    }
     const handleSaveEdited = ()=>{
        const updatedData = savedTasks.map((task , index)=>index === taskEditing ? taskEdited : task);
        setSavedTasks(updatedData);
        localStorage.setItem("tasks" , JSON.stringify(updatedData));
        setTaskEditing(null);
     }
     

     const startTimer = ()=>{
      const timer = setTimeout(()=>{
       setDeletedIndex(null);
       setDeletedTask(null);
       setShowToast(false);
      },5000)
      setUndoTimer(timer);
     }
     const  handleUndoDeleted = ()=>{
      if (deletedTask && deletedIndex !== null){
 const updateData = [...savedTasks];
      updateData.splice(deletedIndex , 0 , deletedTask);
      setSavedTasks(updateData);
      localStorage.setItem("tasks" , JSON.stringify(updateData));
      }
      clearTimeout(undoTimer);
      setDeletedTask(null);
      setDeletedIndex(null);
      setShowToast(false);
     }
  return (
    <div>
         <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mx-2">
        {savedTasks && savedTasks.map((task, index) =>
  task ? (
    taskEditing === index ? (
      <Modal
        taskEdited={taskEdited}
        setTaskEdited={setTaskEdited}
        handleSaveEdited={handleSaveEdited}
        setTaskEditing={setTaskEditing}
      />
    ) : (
      <div key={index}>
        <div className="bg-[#1D2333] p-4 shadow-lg rounded-xl flex flex-col gap-[3em]">
          <div className="flex flex-col">
            <h3 className={`text-white text-lg ${task?.status === "completed" ? "line-through" : ""}`}>
              {task?.title}
            </h3>
            <p className={`text-gray-600 text-md ${task?.status === "completed" ? "line-through" : ""}`}>
              {task?.description}
            </p>
            <p className={`text-gray-300 ${task?.status === "completed" ? "line-through" : ""}`}>
              {task?.status}
            </p>
          </div>
          <div className="inline-flex gap-2 text-gray-300 mx-auto text-sm">
            {features.map((feature) => (
              <button
                className="border-1 border-gray-400 px-3 py-2 transition-all duration-300 cursor-pointer hover:bg-[#050B1E] rounded-2xl flex items-center justify-center"
                onClick={() => handleFunctionality(index, feature)}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  ) : null
)}
 
  </div>
  {/* Undo Toast Notification */}
      {showToast  && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-2 rounded-lg tcursor-pointer">
          <p>
            Task deleted.{" "}
            <button onClick={ handleUndoDeleted} className="underline cursor-pointer">
              Undo
            </button>
          </p>
        </div>
      )}
    </div>
  )
}

export default TaskCards