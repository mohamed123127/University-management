// ToggleButton.js
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

export default function Dropdown({ isOpen, setIsOpen, Orientation }) {
  // دالة لتبديل الحالة
  const handleClick = () => setIsOpen(!isOpen);

  

  return (
    <button
      className="p-2bg-blue-500 hover:bg-blue-600  focus:outline-none rounded"
      onClick={handleClick}
    >
      {Orientation === "horizontal" ? (
        isOpen ? (
          <ChevronLeftIcon className="h-5 w-5 text-white" />
        ) : (
          <ChevronRightIcon className="h-5 w-5 text-white" />
        )
      ) : Orientation === "vertical" ? (
        isOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-white" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-white" />
        )
      ) : null}
    </button>
  );
}
