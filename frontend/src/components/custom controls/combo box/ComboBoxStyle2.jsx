import React,{useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';

export default function ComboBoxStyle2({
  Name,
  options,
  value,
  onChange,
  comboBoxClassName,
  disabled = false,
}) {

  const [selectedValuebgColor,setSelectedValuebgColor] = useState('white');
  useEffect(()=>{
    const selectedOption = options.find((option) => t(option.label) === t(value));
    //alert(value);
    //console.log(selectedOption);
    if(selectedOption){
      const bgColorClass = selectedOption.className || "bg-white";
      setSelectedValuebgColor(bgColorClass); // تحديث الخلفية
    }
  },[value])
  const { t, i18n } = useTranslation();

  return (
    <div className={`${comboBoxClassName} h-7`}>
      <select
        name={Name}
        value={value}
        onChange={onChange}
        className={`${selectedValuebgColor} border border-gray-200 rounded-md ${value === "" ? 'text-white' : 'text-[#374151]' } font-bold focus:outline-none placeholder-[#9CA3AF] pl-1 h-full w-full cursor-pointer`}
        disabled={disabled}
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.label} className={option.className || "bg-gray-200 text-black"}>
            {t(option.label) || t(option.value)}
          </option>
        ))}
      </select>
    </div>
  );
}

