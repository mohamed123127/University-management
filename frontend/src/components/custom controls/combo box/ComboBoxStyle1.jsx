import React from "react";
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';


export default function ComboBoxStyle1({ Name, options, value, onChange, comboBoxClassName, disabled = false }) {
    const { t, i18n } = useTranslation();

    return (
        <div className={comboBoxClassName}>
            <select
                name={Name}
                value={value}
                onChange={onChange}
                className={`bg-white border border-gray-200 border-2 rounded-md text-[#374151] focus:outline-none placeholder-[#9CA3AF] pl-1 cursor-pointer ${comboBoxClassName}`}
                disabled={disabled}
            >
                <option value="" disabled hidden>{t('SelectOne')}</option>
                <option value="-" disabled hidden className="text-center">-</option>
                {options.map((option, index) => (
                    <option key={index} value={option} className="cursor-pointer">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
