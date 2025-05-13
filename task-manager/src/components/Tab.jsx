import React,{useState} from 'react'

function Tab() {
      const [tabs , setTabs] = useState([{ id:1,name:"MyTab"}]);
      const [activeTab , setActiveTab] = useState(1);
      const [tabName , setTabName] = useState("");
      const [showInput , setShowInput] = useState(false);
      
      const addingTab = ()=>{
        if(!tabName.trim()){
          return ;
        }
        
         const newTab = ({id:tabs.length + 1 , name:tabName});
          setTabs([...tabs ,newTab ]);
          setTabName("");
          setShowInput(false);
      }
      const active = tabs.find(tab=> tab.id === activeTab);
  return (
    <div className="min-h-screen  bg-gradient-to-b from-[#060C24] via-[#08143E] to-[#08143E] pt-7 ">
      
        <div className="bg-white max-w-4xl mx-auto rounded-xl  p-8  ">
          <div className='flex gap-2 text-grey-200 border-b-1 border-gray-400 px-[4em]'>
        {tabs.map(tab=><div className="flex  items-center justify-start gap-2 px-2 " key={tab.id} ><button key={tab.id} onClick={()=>setActiveTab(tab.id)} className="cursor-pointer text-grey-100">{tab.name}</button>
      </div>)}
        <p className='ml-auto'><button className="cursor-pointer  text-grey-200 py-2" onClick={()=>setShowInput(!showInput)}>+Tab New</button></p>
      </div>
      
 
      {showInput && <div className="inline-flex  gap-4  mt-4">
      <input type="text" className='border-1  border-gray-300 focus:outline-none focus:ring-2 px-2 ring-blue-100 rounded-lg ' value={tabName} onChange={(e)=>setTabName(e.target.value)}/>
      <button onClick={addingTab} className="  bg-[#08143E]  hover:bg-[#282e46] p-3 text-white cursor-pointer  rounded-lg ">+</button>
     </div>}
      {active && <div className="">
                                                                            
        </div>}
      </div>
     
    </div>
  )
}

export default Tab