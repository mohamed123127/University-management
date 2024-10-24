import React from "react";
import PropTypes from 'prop-types'; 

export default function ButtonStyle1({ buttonText, onClick , buttonClassName}){
    return(
      <button onClick={onClick} className={`bg-[#1E3A8A] hover:bg-[#3B82F6] text-white rounded-[5px] p-1 text-[16px] font-Cairo ${buttonClassName}`}>
      {buttonText}
    </button>
    );
}

ButtonStyle1.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
  };