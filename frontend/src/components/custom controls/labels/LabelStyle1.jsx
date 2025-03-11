import React from "react";
import PropTypes from 'prop-types'; 
import { useTranslation } from 'react-i18next';
export default function LabelStyle1({labelText, labelClassName}) {
     const { t, i18n } = useTranslation();
    return (
        <div>
            <p className={`text-[#374151] font-cairo ${labelClassName}`}>{t(labelText)}</p>
        </div>
    );
}

LabelStyle1.propTypes = {
    labelText: PropTypes.string.isRequired,
    labelClassName: PropTypes.string,
};
