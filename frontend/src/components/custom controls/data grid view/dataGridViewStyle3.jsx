import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import ComboBoxStyle2 from "../combo box/ComboBoxStyle2";

function DataGridViewStyle3({ Columns, Data, onAction }) {
    const { t } = useTranslation();

    const [combosState, setCombosState] = useState({}); // حالة منفصلة لكل ComboBox

    const options = [
      { value: "EnAttent", label: "En Attent", bgColor: "red" },
      { value: "EnCours", label: "En Cours", bgColor: "blue" },
      { value: "Pret", label: "Pret", bgColor: "green" },
    ];
  
    // التعامل مع التغيير في كل ComboBox
    const handleComboChange = (id, value) => {
      const selectedOption = options.find((opt) => opt.value === value);
      setCombosState((prevState) => ({
        ...prevState,
        [id]: {
          value,
          bgColor: selectedOption?.bgColor || "",
        },
      }));
    };
  

    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-md">
            <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        {Columns.map((column) => (
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
                    {Data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={`border-b transition duration-200 ${
                                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } hover:bg-gray-200`}
                        >
                            {Columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="px-4 py-2 text-sm text-gray-600"
                                >
                                    {column.name === "Action" ? (
                                        <button
                                            onClick={() => {
                                                onAction(row);
                                                alert("Printing...");
                                            }}
                                            className="px-3 py-1 rounded text-white bg-blue-500 hover:bg-blue-600 transition duration-200 flex items-center justify-center"
                                        >
                                            <FontAwesomeIcon icon={faPrint} className="mr-2" />
                                            {t("Imprimer")}
                                        </button>
                                    ) : column.name === "combobox" ? (
                                        <div>
                                           <ComboBoxStyle2
                                         Name={`combo-${rowIndex}`}
                                          options={options}
                                          value={combosState[rowIndex]?.value || ""}
                                           comboBoxClassName="w-full text"
                                            onChange={(e) => handleComboChange(rowIndex, e.target.value)}
                                             disabled={false}
                                           bgColor={combosState[rowIndex]?.bgColor || ""} />
                                        </div>
                                    ) : (
                                        row[column.name] // Display other column values
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
