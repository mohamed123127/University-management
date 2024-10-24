import React from "react";
import PropTypes from 'prop-types'; 

export default function LabelStyle1({labelText, labelClassName}) {
    return (
        <div>
            <p className={`text-[#374151] font-cairo mr-5 ${labelClassName}`}>{labelText}</p>
        </div>
    );
}

LabelStyle1.propTypes = {
    labelText: PropTypes.string.isRequired,
    labelClassName: PropTypes.string,
};
