import react from "@heroicons/react";
import Dropdown from "../custom controls/buttons/Dropdown";
import { useEffect, useState } from "react";

export default function SideBatItemWithList({itemIcon:Icon,Title,isOpen,ItemsList,OpenedList,setOpenedList}){
  const handleListClick = (listName) => {
    console.log(OpenedList);

    setOpenedList((prevList) => (prevList === listName ? "" : listName));
  };

  return(
        <div className={`flex flex-col items-center space-y-2 ${!isOpen }`}>
        {/* عنصر DocumentRequests مع القائمة الفرعية */}
        {
          isOpen ?        
        <div className={` ${!isOpen && "hidden"} flex items-center justify-between cursor-pointer w-full hover:bg-blue-500 rounded relative`}>
          <div className="flex items-center font-semibold">
            <Icon className="h-6 w-6 m-1 text-white" />
            <span className="text-base whitespace-nowrap">{Title}</span>
          </div>
          <Dropdown isOpen={OpenedList === Title} setIsOpen={()=>handleListClick(Title)} Orientation={"vertical"} ClassName='mr-2 mt-1'/>
          <ul className={`absolute left-full top-0 ml-2 mt-1 bg-blue-500 hover:bg-blue-600 shadow-lg rounded-lg w-48 overflow-hidden transition-max-height duration-300 ease-in-out ${OpenedList === Title ? "max-h-96" : "max-h-0"}`}>
            {ItemsList.map((item, index) => (
                <li key={index} className="cursor-pointer bg-blue-500 hover:bg-blue-600 p-2 rounded">{item}</li>
            ))}
          </ul>
        </div>       
        :
        <div className="flex justify-center cursor-pointer w-full hover:bg-blue-500">
            <Icon className="h-7 w-7 mb-2 mt-1 text-white" />
        </div>
        }
        </div>
    );
}