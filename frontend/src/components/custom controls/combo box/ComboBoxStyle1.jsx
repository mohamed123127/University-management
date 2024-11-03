import React from "react";
import PropTypes from 'prop-types';

export default function ComboBoxStyle1({ Name, options, value, onChange, comboBoxClassName, disabled = false }) {
    return (
        <div className={comboBoxClassName}>
            <select
                name={Name}
                value={value}
                onChange={onChange}
                className={`bg-white border border-gray-200 border-2 rounded-md text-[#374151] focus:outline-none placeholder-[#9CA3AF] pl-1 ${comboBoxClassName}`}
                disabled={disabled}
            >
                <option value="" disabled hidden>Select one</option>
                <option value="-" disabled hidden className="text-center">-</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

ComboBoxStyle1.propTypes = {
    Name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
