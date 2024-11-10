import React from "react";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa"; // استيراد الأيقونة من React Icons


export default function Account({AccountName,AccountImage,isOpen,setIsOpen,ClassName}){
    const clickButtonHandled = ()=>{ setIsOpen(!isOpen);}
    return (
        <div className={`${ClassName}`}>
  <button onClick={clickButtonHandled} className="flex justify-end relative">
    {/* صورة الحساب */}
    <AccountImage className="relative rounded-full h-8 w-8 text-white  object-cover" />

    {/* القائمة المنبثقة */}
    <div
      className={`mt-9 absolute flex flex-col items-center bg-white border border-gray-300 rounded-b-lg overflow-hidden w-64 h-auto mt-2 shadow-lg ${isOpen ? "transform scale-100 opacity-100 transition ease-out duration-200" : "transform scale-95 opacity-0 transition ease-in duration-100 pointer-events-none"}`}
    >
      {/* رأس القائمة */}
      <div className="flex items-center w-full p-2">
        <h2 className="text-lg font-semibold text-gray-800">{AccountName}</h2>
        <AccountImage className="rounded-full h-6 w-6 ml-auto text-black border-2 border-blue-500 object-cover" />
      </div>

      {/* الخط الفاصل */}
      <hr className="w-[90%] h-[1px] bg-gray-300 mx-auto mt-1" />

      {/* زر Logout */}
      <div className="flex items-center w-full p-2 mt-1 text-blue-600 cursor-pointer hover:text-blue-800 transition-colors duration-200">
        <FaSignOutAlt className="mr-2 text-lg" />
        <span className="text-sm font-medium">Logout</span>
      </div>
    </div>
  </button>
</div>
    );
}