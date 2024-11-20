import React from "react";
import PropTypes from "prop-types";

export default function ComboBoxStyle2({
  Name,
  options,
  value,
  onChange,
  comboBoxClassName,
  disabled = false,
  bgColor,
}) {
  return (
    <div className={comboBoxClassName}>
      <select
        name={Name}
        value={value}
        onChange={onChange}
        className={`border border-gray-200 rounded-md text-[#374151] focus:outline-none placeholder-[#9CA3AF] pl-1 w-full cursor-pointer`}
        style={{ backgroundColor: bgColor }} // تطبيق لون الخلفية هنا
        disabled={disabled}
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value} className={option.className || ""}>
            {option.label || option.value}
          </option>
        ))}
      </select>
    </div>
  );
}

ComboBoxStyle2.propTypes = {

  Name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string,
      className: PropTypes.string,
      bgColor: PropTypes.string, // لون الخلفية الخاص بكل خيار
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  comboBoxClassName: PropTypes.string,
  disabled: PropTypes.bool,
  bgColor: PropTypes.string, // 
};
