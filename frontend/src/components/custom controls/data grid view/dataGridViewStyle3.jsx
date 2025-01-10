import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faImage } from "@fortawesome/free-solid-svg-icons";
import ComboBoxStyle2 from "../combo box/ComboBoxStyle2";
import DocumentRequest from "js/models/DocumentRequest";
import TextBoxStyle2 from "../textBox/TextBoxStyle2";

function DataGridViewStyle3({ Columns, Data, setData }) {
    const { t } = useTranslation();
    const options = [
        { label: 'Pending', className: "bg-blue-200" },
        { label: t("InProgress"), className: "bg-orange-200" },
        { label: 'Completed', className: "bg-green-200" },
        { label: 'Rejected', className: "bg-red-200" },
    ];
    
    const handleChange = async (row, value) => {
        console.log(Data);
        setData(prevData =>
            prevData.map(Row =>
                Row === row ? { ...Row, Status: value ,LastUpdatedDate:new Date().toLocaleDateString('en-CA')} : Row
            )
        );
    
        try {
            const response = await DocumentRequest.UpdateStatus(row.ID, value,row.studentId);
            if(!response.success){
                alert("errdor \n" + response.message);
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Error in updating status: " + error.message);
        }
    };
    
    const handleTextboxChange = (row, value) => {
        setData(prevData =>
            prevData.map(Row =>
                Row === row ? { ...Row, Notes: value } : Row
            )
        );
    };
    

    const handleTextboxSubmit = (row, value) => {
        if(value !== "" && row && row.ID ){
            console.log(row.ID);
            DocumentRequest.AddNote(row.ID,value);
            console.log("g");
        }else{
            console.log('b');
        }
    };
    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-md">
            <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        {Columns.map((column) => (
                            <th key={column.name} className="px-4 py-2 border-b border-gray-300 text-center text-sm font-medium text-gray-700" style={{ width: column.width }}>{t(column.Header)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Data.map((row, rowIndex) => (
                        <tr key={rowIndex} className={`border-b transition duration-200 ${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}>
                            {Columns.map((column, colIndex) => (
                                <td key={colIndex} className="px-4 py-2 text-sm text-gray-600 text-center">
                                    {column.name === "Action" ? (
                                        <div className="flex space-x-2 justify-center items-center">
                                            <button onClick={() => { const url = row.DocumentUrl.replace("C:/xampp/htdocs", "http://localhost"); window.open(url, "_blank"); }} className="px-3 py-1 rounded text-white bg-blue-500 hover:bg-blue-600 transition duration-200 flex items-center justify-center">
                                                <FontAwesomeIcon icon={faImage} className="ltr:mr-2 rtl:ml-2" /> {t("Review")}
                                            </button>
                                        </div>
                                    ) : column.name === "combobox" ? (
                                        <div>
                                            <ComboBoxStyle2
                                                    key={rowIndex}
                                                    Name={`comboBox-${rowIndex}`}
                                                    options={options}
                                                    value={row.Status}
                                                    onChange={(e) => handleChange(row, e.target.value)}
                                                    comboBoxClassName="w-36 h-10"
                                                    />        
                                        </div>
                                    ) : column.name === "textBox" ? (
                                        <div>
                                            <TextBoxStyle2 key={rowIndex} Name={`textBox-${rowIndex}`} value={row.Notes} onChange={(e) => handleTextboxChange(row, e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault(); // منع السلوك الافتراضي (مثل الانتقال للسطر التالي)
                                                    handleTextboxSubmit(row, e.target.value); // استدعاء المعالجة عند الضغط على Enter
                                                }
                                            }}
                                            onBlur={(e) => handleTextboxSubmit(row, e.target.value)} // استدعاء المعالجة عند فقدان التركيز
                                            placeholder="" textBoxClassName='h-7 bg-transparent border-none w-full text-center'/>
                                        </div>
                                    ) : (
                                        t(row[column.name])
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataGridViewStyle3;
