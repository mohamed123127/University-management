import React from "react";
import PropTypes from 'prop-types'; 
import { useTranslation } from 'react-i18next';
export default function TextBoxStyle2({Name,placeholder="أدخل النص",type="text",value,onChange,textBoxClassName,onKeyDown,onBlur}){
    const { t, i18n } = useTranslation();
    return(
        <input name={Name} value={value} onChange={onChange} onKeyDown={onKeyDown} onBlur={onBlur}
        type={type} placeholder={t(placeholder)} className={`bg-white border border-gray-200 border-2 rounded-md text-[#374151] focus:outline-none placeholder-[#9CA3AF] pl-1 ${textBoxClassName}`}/>
    );
}

TextBoxStyle2.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};