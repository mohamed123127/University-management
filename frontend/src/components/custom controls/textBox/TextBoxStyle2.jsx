import React from "react";
import PropTypes from 'prop-types'; 

export default function TextBoxStyle2({Name,placeholder="أدخل النص",type="text",value,onChange,textBoxClassName}){
    return(
        <input name={Name} value={value} onChange={onChange}
        type={type} placeholder={placeholder} className={`bg-white border border-gray-200 border-2 rounded-md text-[#374151] focus:outline-none placeholder-[#9CA3AF] pl-1 ${textBoxClassName}`}/>
    );
}

TextBoxStyle2.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};