import React, { useState } from "react";
import { useTranslation } from "react-i18next"; 
import Student from "js/models/Student";

function DataGridViewStyle2({ Columns, Data, onAction, ClassName, setData }) {
    const { t } = useTranslation();

    if (!Columns || !Data) {
        return <div>Loading...</div>;
    }

    const toggleActive = async (rowIndex,row) => {
        await Student.changeStatus({"id":row.Id,"status":!row.Active});
    
        setData((prevStudents) => {
            const updatedStudents = [...prevStudents];
            
            if (updatedStudents[rowIndex]) {
                updatedStudents[rowIndex] = {
                    ...updatedStudents[rowIndex], 
                    Active: updatedStudents[rowIndex].Active === 1 ? 0 : 1
                };
            } else {
                console.error("Row index out of bounds");
            }
    
            return updatedStudents;
        });
    };
    

    return (
        <div className={`${ClassName} min-w-full border border-gray-300 bg-white shadow-lg rounded-md`}>
            <table className="min-w-full">
                <thead className="bg-gray-100">
                    <tr>
                        {(Columns || []).map((column) => (
                            <th
                                key={column.name}
                                className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-700"
                                style={{ width: column.width }}
                            >
                                {t(column.Header)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {(Data || []).map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={`border-b transition duration-200 ${
                                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } hover:bg-gray-200`}
                        >
                            {(Columns || []).map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="px-4 py-2 text-sm text-gray-600"
                                >
                                    {column.name === "Action" ? (
                                        <button
                                            onClick={() => {
                                                toggleActive(rowIndex,row);
                                                //onAction(row);
                                            }}
                                            className={`px-3 py-1 rounded text-white transition duration-200 ${
                                                row.Active
                                                    ? "bg-green-500 w-[80px] hover:bg-green-600"
                                                    : "bg-red-500 w-[80px] hover:bg-red-600"
                                            }`}
                                        >
                                            {row.Active ? "Active" : "Inactive"}
                                        </button>
                                    ) : (
                                        row[column.name]
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

export default DataGridViewStyle2;
