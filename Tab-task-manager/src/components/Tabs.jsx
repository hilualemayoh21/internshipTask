import React, { useState, useEffect } from 'react';

function Tabs() {
  const [tabs, setTabs] = useState([{ id:1 ,name: 'Mytab',task: [] }]);
  const [showInput, setShowInput] = useState(false);
  const [activeTab, setActiveTab] = useState();
  const [tabName, setTabName] = useState('');
  const [taskInput, setTaskInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [showToast , setShowToast] = useState(false);
  const [deletedTab , setDeletedTab] = useState();

  const features = ['Complete', 'Update', 'Delete'];

  useEffect(() => {
    const storeData = JSON.parse(localStorage.getItem('mytab'));
    if (storeData && storeData.length > 0) {
      setTabs(storeData);
      setActiveTab(1);
    }
  }, []);
   
  const addingTab = () => {
    if (!tabName.trim()) return;
    const newTab = { id: Date.now(), name: tabName, task: [] };
    const updatedTabs = [...tabs, newTab];
    setTabName('');
    setShowInput(false);
    setActiveTab(newTab.id);
//      setTabs(updatedTabs);
//  localStorage.setItem('mytab', JSON.stringify(updatedTabs));
  };

  const addingTask = () => {
    if (!taskInput.trim()) return;
    const updatedTabs = tabs.map((tab) => {
      if (tab.id === activeTab) {
        return {
          ...tab,
          task: [...tab.task, { id: Date.now(), text: taskInput, status: 'pending' }],
        };
      }
      return tab;
    });
    // setTabs(updatedTabs);
    // localStorage.setItem('mytab', JSON.stringify(updatedTabs));
     setUpdatedTabData(updatedTabs);
    setTaskInput('');
  };

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  const setUpdatedTabData = (updated)=>{
    setTabs(updated);
    localStorage.setItem("mytab" , JSON.stringify(updated));

  }

  const handleTaskFunctionality = (taskId, feature) => {
    if (!activeTabData) return; // Ensure activeTabData is not null

    if (feature === 'Complete') {
      const updatedTab = tabs.map((tab) => {
        if (activeTab === tab.id) {
          const updatedTask = tab.task.map((task) =>
            task?.id === taskId ? { ...task, status: 'completed' } : task
          );
          return { ...tab, task: updatedTask };
        }
        return tab;
      });
      // setTabs(updatedTab);
      // localStorage.setItem('mytab', JSON.stringify(updatedTab));
       setUpdatedTabData(updatedTab);
    }
     else if (feature === 'Delete') {
      const updatedTab = tabs.map((tab) => {
        if (tab.id === activeTab) {
          const updatedTask = tab.task.filter((task) => task.id !== taskId);
          return { ...tab, task: updatedTask };
        }
        return tab;
      });
      setUpdatedTabData(updatedTab);
      // setTabs(updatedTab);
      // localStorage.setItem('mytab', JSON.stringify(updatedTab));
    } 
    else if (feature === 'Update') {
      setEditIndex(taskId);
      const editableTask = activeTabData.task.find((task) => task.id === taskId);
      if (editableTask) {
        setEditedText(editableTask.text); // Set the text to be edited
      }
    }
  };

  const saveEditedTask = () => {
    const updatedTabs = tabs.map((tab) => {
      if (tab.id === activeTab) {
        const updatedTask = tab.task.map((task) =>
          task.id === editIndex ? { ...task, text: editedText } : task
        );
        return { ...tab, task: updatedTask };
      }
      return tab;
    });
    // setTabs(updatedTabs);
    // localStorage.setItem('mytab', JSON.stringify(updatedTabs));
     setUpdatedTabData(updatedTabs);
    setEditedText('');
    setEditIndex(null);
  };
   const handleDelete =(currentTab)=>{
     const updateTab= tabs.filter(tab=>tab.id !== currentTab);
    const DeletedTab = tabs.find(tab=>tab.id === currentTab );
   if(currentTab!== 1) {
    setShowToast(true);
    setDeletedTab(DeletedTab);
    //  setTabs(updateTab);
    //  localStorage.setItem("mytab" , JSON.stringify(updateTab));
     setUpdatedTabData(updatedTab);
    }
    if(currentTab === activeTab && updateTab.length > 0){
        setActiveTab(updateTab[0].id); }
        setTimeout(()=>{
        setDeletedTab(null);
        setShowToast(false);
        },3000); }
    
        const undoDeleted = ()=>{
            if(deletedTab.task && deletedTab.task.length > 0){
                const restoreDeleted = [...tabs , deletedTab];
                setActiveTab(deletedTab.id);
                // setTabs(restoreDeleted);
                // localStorage.setItem("mytab" , JSON.stringify(restoreDeleted));
                 setUpdatedTabData(restoreDeleted);
                setShowToast(false);
                setDeletedTab(null);
            }
        }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060C24] via-[#08143E] to-[#08143E] p-7">
      <div className="bg-white max-w-5xl p-8 md:p-14 mx-auto rounded-xl shadow-md relative">
        <div className="text-gray-600 flex border-b-2 border-gray-400">
          {tabs.map((tab) => (
            <div className="flex items-center px-2 md:px-4" key={tab.id}>
              <button
                className={`p-2 ${activeTab === tab.id ? 'border-b-2 border-[#08143E] text-blue-500 ' : ''} cursor-pointer `}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </button>
            </div>
          ))}
          <button onClick={() => setShowInput(!showInput)} className="cursor-pointer ml-auto hover:text-blue-300">
            +Newtab
          </button>
        </div>
        {showInput && (
          <div className="flex gap-4 items-center mt-4">
            <input
              type="text"
              value={tabName}
              onChange={(e) => setTabName(e.target.value)}
              className="border-1 border-gray-300 p-1 focus:outline-none rounded-md text-gray-400"
            />
            <button
              className="bg-[#08143E] px-3 py-[6px] rounded-lg text-white flex justify-center items-center hover:bg-[#060C24] cursor-pointer"
              onClick={addingTab}
            >
              +
            </button>
          </div>
        )}
        {activeTabData && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-center items-center my-6 gap-3 rounded-lg">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                className="border-1 border-gray-400 focus:outline-none px-2"
              />
              <button onClick={addingTask} className='hover:text-gray-500 cursor-pointer'>Add</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 mx-auto">
              {activeTabData.task &&
                activeTabData.task.length > 0 &&
                activeTabData.task.map((task) => (
                  <div key={task?.id} className="bg-[#201335] text-white w-full px-2 py-4 sm:py-8 sm:px-10 md:px-12 md:py-4 rounded-xl shadow-lg md:mx-auto md:mb-0 mb-5">
                    {task?.id === editIndex ? (
                      <div className="flex gap-2 ">
                        <input
                          type="text"
                          value={editedText}
                          onChange={(e) => setEditedText(e.target.value)}
                          className="border-1 border-gray-400 p-2 rounded-md"
                        />
                        <button onClick={saveEditedTask} className="bg-green-500 text-white px-2 py-1 rounded-md">
                          Save
                        </button>
                      </div>
                    ) : (
                      <>
                        <div  className={`${task.status === "completed" ? "text-gray-400":""} flex gap-4  md:justify-start justify-center`}>
                            <p className="text-center md:text-lg text-sm">{task?.text}</p>
                        <p className="text-center  md:text-lg text-sm">{task?.status}</p>
                        </div>
                        
                        <div className="flex gap-3 mt-4 mx-auto">
                          {features.map((feature, index) => (
                            <button key={index} className="cursor-pointer md:text-lg text-sm" onClick={() => handleTaskFunctionality(task.id, feature)}>
                              {feature}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>
            <div className='absolute flex justify-center bottom-0  sm:bottom-4  my-3 md:bottom-3 right-7   bg-gray-400 px-3 py-1 rounded-lg hover:bg-gray-300 '>
            <button className='cursor-pointer' onClick={()=>handleDelete(activeTabData.id)}>RemoveTab</button>
        </div>
        {deletedTab?.task.length > 0 && showToast &&
        <div>
   <span className="text-gray-400 text-lg">Tab {deletedTab?.name} deleted</span>
       <button onClick={undoDeleted} className="text-blue-500 text-lg font-bold cursor-pointer">undo</button>    
        </div>}
          </div>
        )}
        
      </div>
    </div>
  );
}

export default Tabs;
