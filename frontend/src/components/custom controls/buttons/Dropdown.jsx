import React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

export default function Dropdown({ isOpen, setIsOpen, Orientation, ClassName}) {
  // دالة لتبديل الحالة
  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div
      className={`focus:outline-none rounded ${ClassName}`}
      onClick={(event)=>{event.stopPropagation();handleClick()}}>
      {Orientation === "horizontal" ? (
        document.dir === "rtl" ? (
          isOpen ? (
            <ChevronRightIcon className="h-5 w-5 text-white" />
          ) : (
            <ChevronLeftIcon className="h-5 w-5 text-white" />
          )
        ) : (
          isOpen ? (
            <ChevronLeftIcon className="h-5 w-5 text-white" />
          ) : (
            <ChevronRightIcon className="h-5 w-5 text-white" />
          )
        )
      ) : Orientation === "vertical" ? (
        isOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-white" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-white" />
        )
      ) : null}
    </div>
  );
}
