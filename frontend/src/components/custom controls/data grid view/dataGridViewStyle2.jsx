import React, { useState } from "react";
import { useTranslation } from "react-i18next"; 
import Student from "js/models/Student";
import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import ChangeRequests from "js/models/ChangeRequests";
import { VirtualRequests } from "js/models/VirtualRequest";
import ComboBoxStyle2 from "../combo box/ComboBoxStyle2";
import Swal from 'sweetalert2';
import Announcement from "js/models/Announcement";

function DataGridViewStyle2({ Columns, Data, onAction, ClassName, setData }) {
    const { t } = useTranslation();

    const roles = [
        { label: "Simple Student", className: "bg-gray-200 text-black" },
        { label: "Group Delegate", className: "bg-blue-200 text-black" },
        { label: "Section Delegate", className: "bg-green-200 text-black" },
        { label: "Section et group Delegate", className: "bg-red-200 text-black" },
    ];

    if (!Columns || !Data) {
        return <div>Loading...</div>;
    }

    const toggleActive = async (rowIndex, row) => {
        await Student.changeStatus({ "id": row.Id, "status": !row.Active });

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

    const AcceptButtonClick = async (row) => {
        const request = await VirtualRequests.getByRequestId(row.Id);
        const studentId = request[0].StudentId;
        ChangeRequests.accepteRequest(row.Id, row.Type, row.NewValue, studentId);
        setData(Data.filter((r) => r.Id !== row.Id));
    };

    const RefusedButtonClick = async (row) => {
        Swal.fire({
            title: t('rejectionNote'),
            html:
                '<textarea id="reason" class="!w-[80%] swal2-textarea" placeholder='+t('rejectionReason')+' style="resize: none;"></textarea>',
            confirmButtonText: t('send'),
            confirmButtonColor: '#3B82F6',
            showCancelButton: true,
            cancelButtonText: t('Cancel'),
            cancelButtonColor: '#EF4444',
            preConfirm: () => {
                const orderCancellationReason = document.getElementById('reason').value;

                if (!orderCancellationReason && orderCancellationReason !== '') {
                    Swal.showValidationMessage(t('fieldRequired'));
                    return false;
                }
                
                return { orderCancellationReason };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const orderCancellationReason = result.value.orderCancellationReason;
                const request = await VirtualRequests.getByRequestId(row.Id);
                const studentId = request[0].StudentId;
                const requestId = request[0].Id;
                ChangeRequests.refusedRequest(row.Id);
                Announcement.Add({"title": t('requestRejectionNumber') + ' ' + requestId,"content": t('reason') + " : " + orderCancellationReason,"recipient":studentId});
                setData(Data.filter((r) => r.Id !== row.Id));
            }
        });
    };

    const handleRoleChange = async (rowIndex, row, event) => {
        const newRole = event.target.value;
        await Student.setRole(row.Id, newRole);
        setData((prevStudents) => {
            const updatedStudents = [...prevStudents];
            updatedStudents[rowIndex] = { ...updatedStudents[rowIndex], Role: newRole };
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
                    {Data.length > 0 ? (
                        (Data || []).map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`border-b transition duration-200 ${
                                    rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-gray-200`}
                            >
                                {(Columns || []).map((column, colIndex) => (
                                    <td key={colIndex} className="px-4 py-2 text-sm text-gray-600">
                                        {column.name === "Action" ? (
                                            <button
                                                onClick={() => toggleActive(rowIndex, row)}
                                                className={`px-3 py-1 rounded text-white transition duration-200 ${
                                                    row.Active
                                                        ? "bg-green-500 w-[80px] hover:bg-green-600"
                                                        : "bg-red-500 w-[80px] hover:bg-red-600"
                                                }`}
                                            >
                                                {row.Active ? t("Active") : t("desactive")}
                                            </button>
                                        ) : column.name === "YesNoButtons" ? (
                                            <div className="flex gap-2">
                                                <button
                                                    className="flex items-center bg-green-500 text-white py-1 px-1 rounded hover:bg-green-600"
                                                    onClick={() => AcceptButtonClick(row)}
                                                >
                                                    <FaCheck className="w-5 h-5" />
                                                </button>
                                                <button
                                                    className="flex items-center bg-red-500 text-white py-1 px-1 rounded hover:bg-red-600"
                                                    onClick={() => RefusedButtonClick(row)}
                                                >
                                                    <IoCloseSharp className="w-5 h-5 text-3xl font-extrabold" style={{ strokeWidth: 40 }} />
                                                </button>
                                            </div>
                                        ) : column.name === "Role" ? (
                                            <ComboBoxStyle2
                                                Name={`role-${rowIndex}`}
                                                options={roles}
                                                value={row.Role}
                                                onChange={(e) => handleRoleChange(rowIndex, row, e)}
                                                comboBoxClassName="w-full"
                                            />
                                        ) : (
                                            row[column.name]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={Columns.length} className="p-3 text-center text-gray-500">
                                No data to show
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default DataGridViewStyle2;
