import React, { useState } from 'react';
import LabelStyle1 from './labels/LabelStyle1';
import { useTranslation } from 'react-i18next';



function ToggleButton({toggleButtonClassName,leftLabel,rightLabel,onToggle}) {
  const { t, i18n } = useTranslation();
  const [isStudent, setIsStudent] = useState(true);

  const handleToggle = (value) => {
    setIsStudent(value);
    if (onToggle) onToggle(value); // تمرير الاختيار إلى parent
  };
  return (
    <div className={`flex ${toggleButtonClassName}`}>
      <LabelStyle1 labelText={leftLabel} labelClassName={`text-s mr-[5px] rtl:ml-[5px] ${!isStudent ? 'text-red-700' : ''}`} />
      <div className="flex w-[60px] h-[24px]">
        <div className={`flex border rounded-2xl h-full w-full relative ${isStudent ? 'bg-blue-300' : 'bg-blue-500'}`}>
          <div className={`absolute w-[22px] h-[22px] bg-white border border-gray-300 rounded-full transition-transform duration-300 ${isStudent ? 'ltr:right-0 rtl:left-0' : 'ltr:left-0 rtl:right-0'}`} />
          <button onClick={() => handleToggle(false)} className={`flex-1`} />
          <button onClick={() => handleToggle(true)} className={`flex-1`} />
        </div>
      </div>
      <LabelStyle1 labelText={rightLabel} labelClassName={`text-s ml-[5px] rtl:mr-[5px] ${isStudent ? 'text-red-700' : ''}`} />
    </div>
  );
}

export default ToggleButton;
