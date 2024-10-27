import React from "react";
import PropTypes from 'prop-types'; 

export default function TextBoxStyle2({Name,placeholder="أدخل النص",value,onChange,textBoxClassName}){
    return(
        <div>
        <input name={Name} value={value} onChange={onChange} type="text" placeholder={placeholder} className={`bg-white border border-gray-100 rounded-md text-[#374151] focus:outline-none placeholder-[#9CA3AF] pl-1 ${textBoxClassName}`}/>
        </div>
    );
}

TextBoxStyle2.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};