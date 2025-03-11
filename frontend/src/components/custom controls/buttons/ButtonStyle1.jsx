import React from "react";
import PropTypes from 'prop-types'; 
import { useTranslation } from 'react-i18next';
export default function ButtonStyle1({ buttonText, onClick , buttonClassName}){
  const { t, i18n } = useTranslation();
    return(
      <button onClick={onClick} className={`bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-500 transition duration-200 p-1 text-[16px] font-Cairo ${buttonClassName}`}>
      {t(buttonText)}
    </button>
    );
}

ButtonStyle1.propTypes = {
    buttonText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
  };