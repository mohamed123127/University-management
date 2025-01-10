import React, { useEffect, useState } from "react";
import DataGridViewStyle3 from "components/custom controls/data grid view/dataGridViewStyle3";
import ComboBoxStyle1 from "components/custom controls/combo box/ComboBoxStyle1";
import ButtonStyle1 from "components/custom controls/buttons/ButtonStyle1";
import { useTranslation } from "react-i18next";
import DocumentRequest from "js/models/DocumentRequest";
import ExcelService from "js/Helpers/ExcelServices";
import Student from "js/models/Student";

export default function DocumentRequestsAdmin() {
    const { t } = useTranslation();
    const searchOptionsTexts = [
        t('allRequests'),
        t('registration_certificate'),
        t("grade_transcript"),
        t('parking_permit'),
        t('library_card'),
        t("internship_permit"),
        t("studentCard"),
        t("block_academic_year")
    ];
    const yearOptionsTexts = [
        t("allYears"),
        "Licence 1",
        "Licence 2",
        "Licence 3",
        "Master 1",
        "Master 2"
    ];
    const statsOptionsTexts = [
        t("all status"),
         "Pending",   
         "Completed",
       t("InProgress"),
        "Rejected"
        
    ];
    const [selectedType, setSelectedType] = useState(t("allRequests"));
    const [selectedYear, setSelectedYear] = useState(t("allYears"));
    const [selectedStatus, setSelectedStatus] = useState(t("all status"));
    const [data,setData] = useState([]);
    const filteredData = data.filter((row) => {
        const typeMatch = selectedType === t("allRequests") || t(row.Type) === selectedType;
        const yearMatch = selectedYear === t("allYears") || row.EducationYear === selectedYear;
        const statusMatch = selectedStatus === t("all status") || row.Status === selectedStatus;
        return typeMatch && yearMatch && statusMatch;
    });

    const columns = [
        { name: "Type", Header: "Request Type", width: "20%", className: "text-center" },
        { name: "textBox", Header: "Notes" , width: "30%", className: "text-center" },
        { name: "combobox", Header: "Status" , width: "12%", className: "text-center" },
        { name: "EducationYear", Header: "EducationYear" , width: "12%", className: "text-center" },
        { name: "SubmissionDate", Header: "Submission Date", width: "10%", className: "text-center" },
        { name: "LastUpdatedDate", Header: "LastUpdated Date", width: "10%", className: "text-center" },
        {name: "Action",Header: "Actions",width: "15%"}
    ];

    const ExportRequests =async ()=>{
        const StudentsId = filteredData.map((data) => data.studentId);
        const RequestTypes = filteredData.map((data) => data.Type);
        const studentDataFromRequests = await Student.GetStudentsById(StudentsId);
        const filtredStutendtData = studentDataFromRequests.map(({ Matricule,LastName,FirstName,EducationYear }) => ({
            Matricule,
            LastName,
            FirstName,
            EducationYear,
          }))
          const mergedData = filtredStutendtData.map((item1, index) => {
            return { ...item1, Type: t(RequestTypes[index]) };  
          });
          //console.log(mergedData);
        ExcelService.exportToExcel(mergedData,"Requests");
    }

    useEffect(()=>{
        const LoadData =async () => {
            try{
                const resulte = await DocumentRequest.GetAll();
                if(resulte.success){
                    setData(resulte.data);
                    //console.log(resulte.data); 
                }else{
                    alert(resulte.success + "\n" + resulte.message);
                }
            }catch(error){
                alert("error in load data : \n" + error);
            }
        }
        LoadData();
    },[])

    return (
        <div className="p-2 min-h-screen">
            {/* Filter bar */}
            <div className="flex flex-wrap justify-between items-center gap-4 bg-white rounded-lg shadow-lg p-4 border border-gray-300 mb-6">
                <div className="flex flex-wrap justify-start items-center gap-4 ">
                <ComboBoxStyle1
                    Name="TypeOfRequest"
                    options={searchOptionsTexts}
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    comboBoxClassName=" rounded-md shadow-sm h-10"
                />
                <ComboBoxStyle1
                    Name="EducationYear"
                    options={yearOptionsTexts}
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    comboBoxClassName="rounded-md shadow-sm h-10"
                />
                  <ComboBoxStyle1
                    Name="status"
                    options={statsOptionsTexts}
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    comboBoxClassName="rounded-md shadow-sm h-10"
                />
                </div>
                <ButtonStyle1 buttonClassName="h-10 w-36 font-bold " buttonText="Export Requests" onClick={ExportRequests}/>
            </div>

            {/* Table display */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-6">
                <DataGridViewStyle3 Columns={columns} Data={filteredData} setData={setData}/>
            </div>
        </div>
    );
}
