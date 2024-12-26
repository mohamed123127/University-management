import React, { useEffect, useState } from "react";
import DataGridViewStyle2 from "components/custom controls/data grid view/dataGridViewStyle2";
import ComboBoxStyle2 from "components/custom controls/combo box/ComboBoxStyle2";
import ButtonStyle1 from "components/custom controls/buttons/ButtonStyle1";
import { useTranslation } from "react-i18next";
import ChangeRequests from "js/models/ChangeRequests";

export default function VisualRequestsAdmin() {
    const { t } = useTranslation();

    const searchOptions = [
        { value: "all", label: t("All Requests") },
        { value: "registration_certificate", label: t('changeGroup') },
        { value: "transcript_request", label:t('changeSection'),},
        { value: "parking_permit", label: t('changeSpeciality') },
        
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

    const [data,setData] = useState([
        { matricule: "12345", firstName: "Ahmed", lastName: "Ben Ali", requestTyp: "changeGroup", year: "licence_3", email: "ahmed.benali@example.com", dacumentRequestDate: "2024-10-01", combobox: "Pending" },
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

    useEffect(()=>{
        const LoadData =async () => {
            try{
                const resulte = await ChangeRequests.getAll();
                if(resulte.success){
                    setData(resulte.data);
                    console.log(resulte.data); 
                }else{
                    alert(resulte.success + "\n" + resulte.message);
                }
            }catch(error){
                alert("error in load data : \n" + error);
            }
        }
        LoadData();
    },[])

    const columns = [
        { name: "Matricule", Header: "Matricule", width: "10%", className: "text-center" },
        { name: "FirstName", Header: "First Name", width: "15%", className: "text-center" },
        { name: "LastName", Header: "Last Name", width: "15%", className: "text-center" },
        { name: "EducationYear", Header: "Year", width: "10%", className: "text-center" },
        { name: "Type", Header: "Type", width: "20%", className: "text-center" },
        { name: "OldValue", Header: "Old value", width: "20%", className: "text-center" },
        { name: "NewValue", Header: "New value", width: "10%", className: "text-center" },
        { name: "SubmissionDate", Header: "Submission Date", width: "10%", className: "text-center" },
        { name: "LastUpdatedDate", Header: "LastUpdated Date", width: "10%", className: "text-center" },
        { name: "YesNoButtons", Header: "Action Date", width: "10%", className: "text-center" },
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
                <DataGridViewStyle2 Columns={columns} Data={filteredData} />
            </div>
        </div>
    );
}
