import React,{useState , useEffect} from 'react'

function Reinforce() {
    const [tasks ,  setTasks ] = useState({title:"" , description:"" , status:"pending"});
    const [savedTask , setSavedTask] = useState([]);
    const [displayModal , setDisplayModal] = useState(false);
    const [selectedTask , setSelectedTask] = useState({});
    const [editableTask , setEditableTask] = useState();
    const features =["complete" , "update" , "delete"];
    

    const {title , description}= selectedTask ;
     useEffect(()=>{
      const storedData = JSON.parse(localStorage.getItem("user")) ;

      if(Array.isArray(storedData)){
         setSavedTask(storedData);
      }
     setSavedTask([]);
    },[]) ;

    const handleSavedTask = ()=> {
      const newTasks = [...savedTask , tasks];
      setSavedTask(newTasks);
      localStorage.setItem("user" , JSON.stringify(newTasks));
      setTasks({title:"" , description:"" , status:"pending"});
    }
     
    const handleFeatures = (feature , currentTab)=>{
      if(feature === "complete"){
       
        let updatedTask= savedTask.map((task , index)=> index === currentTab ?  {...task , status: task.status === "pending" ? "completed" : "pending"}  : task);
        setSavedTask(updatedTask);
        localStorage.setItem("user" , JSON.stringify(updatedTask));
    }
    else if(feature  === "update"){
         setSelectedTask(savedTask[currentTab]);
         setDisplayModal(true);
         setEditableTask(index);

    }
    else if(feature === "delete"){
     const unDeleted = savedTask.filter((task , index)=> index !== currentTab);
     setSavedTask(unDeleted);
     localStorage.setItem("user" , JSON.stringify(unDeleted)); }
      }

   const handleSaveEdited = ()=>{
    const update = savedTask.map((task , index)=> index === editableTask ?  selectedTask: task);
    setSavedTask(update);
    localStorage.setItem("user" , JSON.stringify(update));
    setDisplayModal(false);
    setEditableTask("");
   }
   
  return (
    <div className='bg-gray-600 p-8'>
      <div className=''>
      <input type="text" value={tasks.title}  onChange={(e)=>setTasks({...tasks , title:e.target.value})} className='border-1 border-gray-300 mx-4'/>
      <input type="text" value={tasks.description} onChange={(e)=>setTasks({...tasks , description:e.target.value})} className='border-1 border-gray-300 mx-2' />
      <button onClick={handleSavedTask} className="px-2 bg-gray-600">Add</button>
      </div>
     
      <div>
      {savedTask.map((task , index)=><div key={index} className='flex flex-col py-4 px-6 bg-gray-500 w-[50%] gap-2 mt-4'>
        <p>{task.title}</p>
        <p>{task.description}</p>
        <p>{task.status}</p>
         <div className="flex gap-3 my-8">
         {
      features.map((feature , i)=><div  key={i} className='flex '>
        <button onClick={()=>handleFeatures(feature ,index)}  className='flex cursor-pointer'>{feature}</button>
      </div>)}
      </div>
       {
        displayModal && 
         <div className="inset-0 bg-black opacity-50">
          <div className="">
             <input type="text" value={title} onChange={(e)=>setSelectedTask({...selectedTask,title:e.target.value})}/>
             <input type="text" value={description} onChange={(e)=>setSelectedTask({...selectedTask,description:e.target.value})}/>
             <button onClick={handleSaveEdited}>save</button>
          </div>
        </div> 
      }
      </div>)}
     
     
    
      </div>
      </div>
  )
}

export default Reinforce