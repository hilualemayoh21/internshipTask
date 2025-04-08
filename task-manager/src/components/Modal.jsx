import React from 'react'
function Modal({taskEdited , setTaskEdited , handleSaveEdited , setTaskEditing}) {
  return (
    <div className="min-h-screen flex items-center  fixed inset-0 bg-black opacity-50 mx-auto w-full  ">
    <div className="bg-white w-[50%]  py-8 shadow-lg rounded-xl mx-auto relative">
  <div className="flex justify-between px-6 " >
    <div className="flex flex-col items-start gap-4 w-full   mx-auto  text-gray-600">
      <input type="text"  value={taskEdited?.title || ""} onChange={(e) => setTaskEdited((prev) => ({ ...prev, title: e.target.value }))} className="w-[85%] text-lg px-2 mt-4 focus:outline-none border border-gray-500 rounded-lg py-[3px]"/>
          <input type="text" value={taskEdited.description} onChange={(e)=>setTaskEdited({...taskEdited , description:e.target.value})} className="w-[85%] px-2 py-1 mt-4 focus:outline-none border-1 border-gray-500 rounded-lg"/>
          <button onClick={handleSaveEdited} className=' border-1 border-gray-700 px-3 text-white py-2 transition-all duration-300 cursor-pointer bg-[#1D2333] hover:bg-[#3B4151] rounded-2xl flex items-center justify-center'>Save</button>
    </div>
          <div className="bg-[#060C24] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#08143E]">
            <button onClick={()=>setTaskEditing(null)} className="text-white">&#10005;</button>
          </div>
          </div>
    </div>
    </div>
  )
}

export default Modal