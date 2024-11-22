import React, { useState } from "react";

export default  function RadioButton({ options, name, value, onChange,radioClassName }) {
    return (
        <div className="flex items-center space-x-4">
            {options.map((option, index) => (
                <label key={index} className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name={name}
                        value={option}
                        checked={value === option}
                        onChange={onChange}
                        className={radioClassName}
                    />
                    <span>{option}</span>
                </label>
            ))}
        </div>
    );
}