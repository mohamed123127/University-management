import React, { useState } from "react";
import CollapseButton from "./custom controls/buttons/Dropdown";
import { DocumentIcon , PlusCircleIcon , EyeIcon , ExclamationCircleIcon , BellIcon , DocumentTextIcon, UserCircleIcon, TableIcon  } from "@heroicons/react/24/solid";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(true); // حالة الشريط الجانبي
  const [openList, setOpenList] = useState(""); // القائمة الفرعية المفتوحة

  const handleListClick = (listName) => {
    setOpenList((prevList) => (prevList === listName ? "" : listName));
  };

  const toggleStatSidebar = () => {
    if (isOpen) {
      setOpenList(""); }
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative flex flex-col h-screen ${isOpen ? "w-64" : "w-16"} bg-blue-500 p-2 text-white transition-width duration-300`}>
      {/* زر الشريط الجانبي */}
      <CollapseButton
        isOpen={isOpen}
        setIsOpen={toggleStatSidebar} // استخدام الدالة المخصصة
        Orientation={"horizontal"}
      />

     <div>
      
     <ul className={`flex flex-col mt-4 space-y-2 ${!isOpen }`}>
        {/* عنصر DocumentRequests مع القائمة الفرعية */}
        {
          isOpen ?        
        <li className={` ${!isOpen && "hidden"} flex items-center justify-between px-4 py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 rounded relative`}>
          
          <div className="flex items-center space-x-2 text-lg font-semibold">
             
 
            <DocumentIcon className="h-7 w-7 text-white" />
            <span>Document Requests</span>


          </div>
          <CollapseButton
            isOpen={openList === "documentrequest"}
            setIsOpen={() => handleListClick("documentrequest")}
            Orientation={"vertical"}
          />
          <ul
            className={`absolute left-full top-0 ml-2 mt-1 bg-blue-500 hover:bg-blue-600 shadow-lg rounded-lg w-48 overflow-hidden transition-max-height duration-300 ease-in-out ${
              openList === "documentrequest" ? "max-h-96" : "max-h-0"
            }`}
          >
            <li className=" cursor-pointer bg-blue-500 hover:bg-blue-600 p-2 rounded"><a href="">Certificate Of Enrollment</a></li>
            <li className="bg-blue-500 hover:bg-blue-600 p-2 rounded"><a href="">Transcript Request</a></li>
            <li className="bg-blue-500 hover:bg-blue-600 p-2 rounded"><a href="">Parking Permit</a></li>
            <li className="bg-blue-500 hover:bg-blue-600 p-2 rounded"><a href="">Library Card</a></li>
            <li className="bg-blue-500 hover:bg-blue-600 p-2 rounded"><a href="">Internship Permit</a></li>
            <li className="bg-blue-500 hover:bg-blue-600 p-2 rounded"><a href="">Student ID Card</a></li>
            <li className="bg-blue-500 hover:bg-blue-600 p-2 rounded"><a href="">Block Academic Year</a></li>
          </ul>
        </li>       
        :
        <div><DocumentIcon className="h-7 w-7 mb-2 mt-4 text-white" /></div>
          }
        {
          isOpen ? 
       
        <li className={` ${!isOpen && "hidden"} flex items-center justify-between px-4 py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 rounded relative`}>
          <div className="flex items-center space-x-2 text-lg font-semibold">
            <EyeIcon className="h-5 w-5 text-white" />
            <span>Visual Requests</span>
          </div>
          <CollapseButton
            isOpen={openList === "visualrequest"}
            setIsOpen={() => handleListClick("visualrequest")}
            Orientation={"vertical"}
          />
          <ul
            className={`absolute left-full top-0 ml-2 mt-1 bg-blue-500 shadow-lg rounded-lg w-48 overflow-hidden transition-max-height duration-300 ease-in-out ${
              openList === "visualrequest" ? "max-h-96" : "max-h-0"
            }`}
          >
            <li className="hover:bg-blue-600 p-2 rounded"><a href="">Group Change Request</a></li>
            <li className="hover:bg-blue-600 p-2 rounded"><a href="">Specialty Change Request</a></li>
            <li className="hover:bg-blue-600 p-2 rounded"><a href="">Club Creation Request</a></li>
          </ul>
        </li>
        :

        <div><EyeIcon className="h-7 w-7 mb-2 mt-4 text-white" /></div>
          }
        
        {
          isOpen ? 
        <li className={` ${!isOpen && "hidden"} flex items-center justify-between px-4 py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 rounded relative`}>
          <div className="flex items-center space-x-2 text-lg font-semibold">
            <PlusCircleIcon className="h-5 w-5 text-white" />
            <span>Additional Requests</span>
          </div>
          <CollapseButton
            isOpen={openList === "AdditionalRequests"}
            setIsOpen={() => handleListClick("AdditionalRequests")}
            Orientation={"vertical"}
          />
          <ul
            className={`absolute left-full top-0 ml-2 mt-1 bg-blue-500 shadow-lg rounded-lg w-48 overflow-hidden transition-max-height duration-300 ease-in-out ${
              openList === "AdditionalRequests" ? "max-h-96" : "max-h-0"
            }`}
          >
            <li className="hover:bg-blue-600 bg-blue-500 p-2 rounded"><a href="">Scholarship Request</a></li>
            <li className="hover:bg-blue-600 bg-blue-500 p-2 rounded"><a href="">Study Abroad Scholarship Request</a></li>
          </ul>
        </li>
        :
        <div><PlusCircleIcon className="h-7 w-7 mb-2 mt-4 text-white" /></div>
      }
       {
          isOpen ? 

        <li className={` ${!isOpen && "hidden"} flex items-center justify-between px-4 py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 rounded relative`}>
          <div className="flex items-center space-x-2 text-lg font-semibold">
            <DocumentTextIcon className="h-5 w-5 text-white" /> {/* Document Icon for Demand Processing */}
            <a href="">View Demand Processing</a>
          </div>
        </li>
        :
       <div> <DocumentTextIcon className="h-7 w-7 mb-2 mt-4 text-white" /></div>
      }
       {
          isOpen ? 

        <li className={` ${!isOpen && "hidden"} flex items-center justify-between px-4 py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 rounded relative`}>
          <div className="flex items-center space-x-2 text-lg font-semibold">
            <UserCircleIcon className="h-5 w-5 text-white" /> {/* User Icon for Managing Student Accounts */}
            <a href="">Manage Student Accounts</a>
          </div>
        </li>
        :
        <div><UserCircleIcon className="h-7 w-7 mb-2 mt-4 text-white" /></div>
      }
       {
          isOpen ? 
       
        <li className={` ${!isOpen && "hidden"} flex items-center justify-between px-4 py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 rounded relative`}>
          <div className="flex items-center space-x-2 text-lg font-semibold">
            {isOpen ? (
              <>
                <EyeIcon className="h-5 w-5 text-white" /> 
                <a href="">Detailed Requests Display</a>
              </>
            ) : (
              <>
                <EyeIcon  className="h-3 w-3  text-white" /> 
                <h1>h</h1>
                
                
              </>
            )}
          </div>
        </li>
        :
        <div><EyeIcon className="h-7 w-7 mb-2 mt-4 text-white" /></div>
      }
       {
          isOpen ? 
        <li className={` ${!isOpen && "hidden"} flex items-center justify-between px-4 py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 rounded relative`}>
          <div className="flex items-center space-x-2 text-lg font-semibold">
            <ExclamationCircleIcon className="h-5 w-5 text-white" /> <a href="">Report Problem</a>  
          </div>
        </li>
        :
        <div><ExclamationCircleIcon className="h-7 w-7 mb-2 mt-4 text-white" /></div>
      }
       {
          isOpen ? 
        <li className={` ${!isOpen && "hidden"} flex items-center justify-between px-4 py-2 cursor-pointer bg-blue-500 hover:bg-blue-600 rounded relative`}>
          <div className="flex items-center space-x-2 text-lg font-semibold">
            <BellIcon className="h-5 w-5 text-white" /> <a href="https://chatgpt.com/c/672c7115-b2cc-8006-897f-2bc4aefa0ea5">Announcements</a>
          </div>
        </li>
        :
        <div><BellIcon className="h-7 w-7 mb-2 mt-4  text-white" /></div>
        
      }
      </ul>
      
     </div>
    </div>
  );
}
