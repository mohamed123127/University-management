import React, { useState } from "react";
import DataGridViewStyle3 from "components/custom controls/data grid view/dataGridViewStyle3";
import ComboBoxStyle2 from "components/custom controls/combo box/ComboBoxStyle2";
import ButtonStyle1 from "components/custom controls/buttons/ButtonStyle1";
import { useTranslation } from "react-i18next";

export default function DocumentRequestsAdmin() {
    const { t } = useTranslation();

    const searchOptions = [
        { value: "all", label: t("All Requests") },
        { value: "registration_certificate", label: t("Registration Certificate") },
        { value: "transcript_request", label: t("Transcript Request") },
        { value: "parking_permit", label: t("Parking Permit") },
        { value: "library_card", label: t("Library Card") },
        { value: "internship_permit", label: t("Internship Permit") },
        { value: "student_id_card", label: t("Student ID Card") },
        { value: "block_academic_year", label: t("Block Academic Year") },
    ];

    const yearOptions = [
        { value: "all", label: t("All Years") },
        { value: "licence_1", label: t("Licence1") },
        { value: "licence_2", label: t("Licence2") },
        { value: "licence_3", label: t("Licence3") },
        { value: "master_1", label: t("master1") },
        { value: "master_2", label: t("master2") },
    ];

    const [selectedType, setSelectedType] = useState("all");
    const [selectedYear, setSelectedYear] = useState("all");

    const [data] = useState([
        { matricule: "12345", firstName: "Ahmed", lastName: "Ben Ali", requestTyp: "registration_certificate", year: "licence_3", email: "ahmed.benali@example.com", dacumentRequestDate: "2024-10-01", combobox: "Pending" },
        { matricule: "67890", firstName: "Sarah", lastName: "Mehdi", requestTyp: "transcript_request", year: "licence_2", email: "sarah.mehdi@example.com", dacumentRequestDate: "2024-09-15", combobox: "Approved" },
        { matricule: "11223", firstName: "Mohamed", lastName: "Ait Wnach", requestTyp: "library_card", year: "licence_3", email: "mohamed.ait@example.com", dacumentRequestDate: "2024-08-22", combobox: "Rejected" },
        { matricule: "44556", firstName: "Nora", lastName: "Saadi", requestTyp: "parking_permit", year: "licence_2", email: "nora.saadi@example.com", dacumentRequestDate: "2024-10-05", combobox: "Pending" },
        { matricule: "44556", firstName: "Nora", lastName: "Saadi", requestTyp: "parking_permit", year: "master_2", email: "nora.saadi@example.com", dacumentRequestDate: "2024-10-05", combobox: "Pending" },
        
        { matricule: "77889", firstName: "Ali", lastName: "Hassan", requestTyp: "block_academic_year", year: "licence_1", email: "ali.hassan@example.com", dacumentRequestDate: "2024-09-20", combobox: "Approved" },
    ]);

    const filteredData = data.filter((row) => {
        const typeMatch = selectedType === "all" || row.requestTyp === selectedType;
        const yearMatch = selectedYear === "all" || row.year === selectedYear;
        return typeMatch && yearMatch;
    });

    const columns = [
        { name: "matricule", Header: "Matricule", width: "10%", className: "text-center" },
        { name: "firstName", Header: "First Name", width: "15%", className: "text-center" },
        { name: "lastName", Header: "Last Name", width: "15%", className: "text-center" },
        { name: "requestTyp", Header: "Request Type", width: "20%", className: "text-center" },
        { name: "year", Header: "Year (Niveau)", width: "10%", className: "text-center" },
        { name: "email", Header: "Email", width: "20%", className: "text-center" },
        { name: "dacumentRequestDate", Header: "Request Date", width: "10%", className: "text-center" },
        { name: "combobox", Header: "Status", width: "10%", className: "text-center" },
    ];

    return (
        <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
            {/* Filter bar */}
            <div className="flex flex-wrap justify-start items-center gap-4 bg-white rounded-lg shadow-lg p-4 border border-gray-300 mb-6">
                <ComboBoxStyle2
                    Name="Type of Request"
                    options={searchOptions}
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    comboBoxClassName="p-3 bg-gray-50 rounded-md shadow-sm border border-gray-300"
                />
                <ComboBoxStyle2
                    Name="Year (Niveau)"
                    options={yearOptions}
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    comboBoxClassName="p-3 bg-gray-50 rounded-md shadow-sm border border-gray-300"
                />
                <ButtonStyle1
                    buttonText={t("Add")}
                    buttonClassName="bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition-colors"
                    onClick={() => console.log("Add button clicked")}
                />
            </div>

            {/* Table display */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-6">
                <DataGridViewStyle3 Columns={columns} Data={filteredData} />
            </div>
        </div>
    );
}