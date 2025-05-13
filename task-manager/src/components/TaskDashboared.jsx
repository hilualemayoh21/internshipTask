import React,{useState , useEffect} from 'react'
import TaskCards from './TaskCards';
import Reinforce from './Reinforce';
export default function TaskDashboared() {
    const [task , setTask] =useState({title:"" , description:"" , status:"pending"});
    const [savedTasks , setSavedTasks] = useState([]);

  const handleAddTask = (event)=>{
    const {name , value} = event.target ;
    setTask((prev)=>({...prev , [name]:value}));
 }
    
   useEffect(()=>{
    const storedTask = JSON.parse(localStorage.getItem("tasks") ) || [];
    setSavedTasks(storedTask);
   },[]);
 const handleSaveTasks = ()=>{
    if(task.title.trim() && task.description.trim()){
        const newTask = [...savedTasks , task];
        setSavedTasks(newTask);
        localStorage.setItem("tasks" , JSON.stringify(newTask));
        setTask({title:"" , description:"" , status:"pending"});
    }
   else{
    alert("please enter  the input field ");
   } 
 }
 const listOfTasks = {savedTasks , setSavedTasks};
  return (
    <div className="bg-gradient-to-b from-[#060C24] via-[#08143E] to-[#08143E] min-h-screen pb-5">
 <div className="max-w-5xl mx-auto flex flex-col  ">
 <div className="bg-[#1E2434] my-6 py-2 md:py-4 rounded-xl md:w-full w-auto flex md:flex-row gap-3 flex-col md:gap-4 justify-center items-start text-white  mx-3 md:mx-auto">
    <div className="text-sm flex md:flex-row flex-col w-[50%] md:w-[40%] gap-2 md:items-center items-start md:justify-start justify-center  mx-auto md:m-0">
  <label className="text-white  text-md">Title</label>
    <input type="text" className="border-1 border-gray-600 w-full rounded-md focus:outline-none px-2 py-1"  name="title" value={task.title} onChange={handleAddTask}/>
    </div>
    <div className="text-sm flex md:flex-row flex-col gap-2 w-[50%] md:w-[40%] items-start md:items-center md:justify-start justify-center mx-auto md:m-0" >
    <label className="text-white text-md">Description</label>
    <input type="text" className="border-1 border-gray-600  rounded-md w-full focus:outline-none px-2 py-1" name="description" value={task.description} onChange={handleAddTask}/>
    </div>
    <div className="flex items-center md:justify-center  justify-start mx-4 bg-[#060C24] px-3 w-[4em] sm:mx-10 md:w-auto lg:m-0 py-1 text-[13px] rounded-lg transition-all duration-300 hover:bg-[#0A1640] hover:text-gray-400 cursor-pointer"><button className="cursor-pointer`" onClick={handleSaveTasks}>ADD</button></div>
 </div>
 <TaskCards listOfTasks={listOfTasks}/>
 {/* <Reinforce/> */}
 </div>
    </div>
  )
}



