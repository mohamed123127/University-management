import React from "react";

export default function TextBoxStyle1({placholder="أدخل النص",textBoxClassName}){
    return(
        <div>
        <input type="text" placeholder={placholder} className={`bg-white border border-2 rounded-md text-[#374151] border-[#3B82F6] hover:border-[#60A5FA] focus:border-[#1D4ED8] focus:outline-none placeholder-[#9CA3AF] pl-1 ${textBoxClassName}`}/>
        </div>
    );
}