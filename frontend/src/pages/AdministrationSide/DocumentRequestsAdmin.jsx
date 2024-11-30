import React, { useEffect, useState } from "react";
import DataGridViewStyle3 from "components/custom controls/data grid view/dataGridViewStyle3";
import ComboBoxStyle1 from "components/custom controls/combo box/ComboBoxStyle1";
import ButtonStyle1 from "components/custom controls/buttons/ButtonStyle1";
import { useTranslation } from "react-i18next";
import DocumentRequest from "js/models/DocumentRequest";

export default function DocumentRequestsAdmin() {
    const { t } = useTranslation();


    const searchOptionsTexts = [
        "All Requests",
        "Registration certificate",
        "Grade transcript",
        "Parking Permit",
        "Library Card",
        "Internship Permit",
        "Student ID Card",
        "Block Academic Year"
    ];
    const yearOptionsTexts = [
        "All Years",
        "Licence1",
        "Licence2",
        "Licence3",
        "master1",
        "master2"
    ];
    const [selectedType, setSelectedType] = useState("All Requests");
    const [selectedYear, setSelectedYear] = useState("All Requests");
    const [data,setData] = useState([]);
    const filteredData = data.filter((row) => {
        //alert(row.Type);
        const typeMatch = selectedType === "All Requests" || t(row.Type) === selectedType;
        //const yearMatch = selectedYear === "All" || row.year === selectedYear;
        return typeMatch ;
    });

    const columns = [
        { name: "Type", Header: "Request Type", width: "20%", className: "text-center" },
        { name: "textBox", Header: "Notes" , width: "30%", className: "text-center" },
        { name: "combobox", Header: "Status" , width: "12%", className: "text-center" },
        { name: "SubmissionDate", Header: "Submission Date", width: "10%", className: "text-center" },
        { name: "LastUpdatedDate", Header: "LastUpdated Date", width: "10%", className: "text-center" },
        {name: "Action",Header: "Actions",width: "15%"}
    ];

    useEffect(()=>{
        const LoadData =async () => {
            try{
                const resulte = await DocumentRequest.GetAll();
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

    return (
        <div className="p-2 min-h-screen">
            {/* Filter bar */}
            <div className="flex flex-wrap justify-start items-center gap-4 bg-white rounded-lg shadow-lg p-4 border border-gray-300 mb-6">
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
            </div>

            {/* Table display */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-6">
                <DataGridViewStyle3 Columns={columns} Data={filteredData} setData={setData}/>
            </div>
        </div>
    );
}
