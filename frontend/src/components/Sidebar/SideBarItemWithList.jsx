import React from "@heroicons/react";
import Dropdown from "../custom controls/buttons/Dropdown";

export default function SideBatItemWithList({ itemIcon, Title, isOpen, ItemsList, OpenedList, setOpenedList, OnClick }) {
  const handleListClick = (listName) => {
    setOpenedList((prevList) => (prevList === listName ? "" : listName));
  };

  return (
    <button onClick={OnClick} className={`flex flex-col items-center space-y-2`}>
      {isOpen ? (
        <div className={`flex items-center justify-between cursor-pointer w-full hover:bg-blue-500 rounded relative ${!isOpen && "hidden"}`}>
          <div className="flex items-center font-semibold ">
            <div className="icon h-6 w-6 m-1 text-white">{itemIcon}</div>
            <span className="text-base whitespace-nowrap">{Title}</span>
          </div>
          <Dropdown isOpen={OpenedList === Title} 
            setIsOpen={() => handleListClick(Title)} 
            Orientation={"vertical"} 
            ClassName="rtl:ml-2 rtl:mt-1 ltr:mr-2 ltr:mt-1"/>
          <ul className={`absolute ${document.dir === "rtl" ? "right-full" : "left-full"} top-0 rtl:mr-2 ltr:ml-2 mt-1 bg-blue-500 hover:bg-blue-600 shadow-lg rounded-lg w-48 overflow-hidden transition-max-height duration-300 ease-in-out ${OpenedList === Title ? "max-h-96" : "max-h-0"}`}>
            {ItemsList.map((item, index) => (
              <li key={index} className="cursor-pointer bg-blue-500 hover:bg-blue-600 p-2 rounded">{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex justify-center cursor-pointer w-full hover:bg-blue-500">
          <div className="icon h-7 w-7 mb-2 mt-1 text-white">{itemIcon}</div>
        </div>
      )}
    </button>
  );
}
