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

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const totalPages = Data ? Math.ceil(Data.length / itemsPerPage) : 1;
    const paginatedData = Data ? Data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

    const roles = [
        { label: "Simple Student", className: "bg-gray-200 text-black" },
        { label: "Group Delegate", className: "bg-blue-200 text-black" },
        { label: "Section Delegate", className: "bg-green-200 text-black" },
        { label: "Section et group Delegate", className: "bg-red-200 text-black" },
    ];

    if (!Columns || !Data) {
        return <div>Loading...</div>;
    }
   
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const toggleActive = async (rowIndex, row) => {
        await Student.changeStatus({ id: row.Id, status: !row.Active });
        setData((prev) => prev.map((r, i) => (i === rowIndex ? { ...r, Active: r.Active === 1 ? 0 : 1 } : r)));
    };

    const AcceptButtonClick = async (row) => {
        console.log(row);
        ChangeRequests.accepteRequest(row.Id, row.Type, row.Matricule1,row.NewValue1,row.Matricule2, row.NewValue2,row.StudentId);
        console.log(t('requestApprovalNumber') + ' ' + row.Id + "\n" + row.StudentId);
        Announcement.Add({"title": t('requestApprovalNumber') + ' ' + row.Id,"content": "","recipient":row.StudentId});
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

    const handleRoleChange = async (row, value) => {
        setData(prevData =>
            prevData.map(Row =>
                Row === row ? { ...Row, Role: value } : Row
            )
        );
        try {
            const response = await Student.setRole(row.Id, value);
            
            if (!response.success) {
                alert("Error\n" + response.message);
            }
        } catch (error) {
            console.error("Error updating role:", error);
            alert("Error in updating role: " + error.message);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        let startPage = Math.max(currentPage - 2, 1);
        let endPage = Math.min(currentPage + 2, totalPages);

        if (startPage > 1) pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push("...");

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (endPage < totalPages - 1) pageNumbers.push("...");
        if (endPage < totalPages) pageNumbers.push(totalPages);

        return pageNumbers;
    };

    return (
        <div className={`${ClassName} min-w-full border border-gray-300 bg-white shadow-lg rounded-md`}>
            <table className="min-w-full">
                <thead className="bg-gray-100">
                    <tr>
                        {Columns.map((column) => (
                            <th key={column.name} className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700" style={{ width: column.width }}>
                                {t(column.Header)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((row, rowIndex) => (
                            <tr key={rowIndex} className={`border-b ${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`}>
                                {Columns.map((column, colIndex) => (
                                    <td key={colIndex} className="px-4 py-2 text-sm text-gray-600">
                                        {column.name === "Action" ? (
                                            <button
                                                onClick={() => toggleActive(rowIndex, row)}
                                                className={`px-3 py-1 rounded text-white transition ${row.Active ? "bg-green-500 w-[80px] hover:bg-green-600" : "bg-red-500 w-[80px] hover:bg-red-600"}`}
                                            >
                                                {row.Active ? t("Active") : t("desactive")}
                                            </button>
                                        ) : column.name === "YesNoButtons" ? (
                                            <div className="flex gap-2">
                                                <button className="bg-green-500 text-white py-1 px-1 rounded hover:bg-green-600" onClick={() => AcceptButtonClick(row)}>
                                                    <FaCheck className="w-5 h-5" />
                                                </button>
                                                <button className="bg-red-500 text-white py-1 px-1 rounded hover:bg-red-600" onClick={() => RefusedButtonClick(row)}>
                                                    <IoCloseSharp className="w-5 h-5 text-3xl font-extrabold" />
                                                </button>
                                            </div>
                                        ) : column.name === "Role" ? (
                                            <ComboBoxStyle2
                                            key={rowIndex}
                                             Name={`role-${rowIndex}`} 
                                             options={roles} 
                                             value={row.Role} 
                                             onChange={(e) => handleRoleChange(row, e.target.value)} 
                                             comboBoxClassName="w-full" />
                                        ) : (
                                            row[column.name]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={Columns.length} className="p-3 text-center text-gray-500">No data to show</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="flex justify-center items-center mt-4 gap-2 pt-2 pb-2">
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50">{"<"}</button>
                {renderPageNumbers().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-1 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
                    >
                        {page}
                    </button>
                ))}
                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50">{">"}</button>
            </div>
        </div>
    );
}

export default DataGridViewStyle2;
