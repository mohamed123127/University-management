import React, { useEffect, useState } from "react";
import DataGridViewStyle3 from "components/custom controls/data grid view/dataGridViewStyle3";
import ComboBoxStyle1 from "components/custom controls/combo box/ComboBoxStyle1";
import DataGridViewStyle2 from "components/custom controls/data grid view/dataGridViewStyle2";
import ComboBoxStyle2 from "components/custom controls/combo box/ComboBoxStyle2";
import ButtonStyle1 from "components/custom controls/buttons/ButtonStyle1";
import { useTranslation } from "react-i18next";
import ChangeRequests from "js/models/ChangeRequests";

export default function VisualRequestsAdmin() {
    const { t } = useTranslation();

    const searchOptions = [
        
        t('allRequests'),
        'Group',
        'Section',
        'Speciality',
        'First Name',
        'Last name',
        'Email',
        'Password'
        
        
    ];

    const yearOptionsTexts = [
        t("allYears"),
        "Licence 1",
        "Licence 2",
        "Licence 3",
        "Master 1",
        "Master 2"
    ];

    const [selectedType, setSelectedType] = useState( t('allRequests'));
    const [selectedYear, setSelectedYear] = useState(t("allYears"));
    const [data,setData] = useState([
 ]);

    const filteredData = data.filter((row) => {
        const typeMatch = selectedType ===  t('allRequests') || row.Type === selectedType;
        const yearMatch = selectedYear === t("allYears") || row.EducationYear === selectedYear;
        return typeMatch && yearMatch;
    });

    useEffect(()=>{
        const LoadData =async () => {
            try{
                const resulte = await ChangeRequests.getAll();
                if(resulte.success){
                    setData(resulte.data.filter(row => row.Status !== "Completed" && row.Status !== "Rejected"));
                    //console.log(resulte.data.filter(row => row.Status !== "Completed"));
                }else{
                    alert(resulte.success + "\n" + resulte.message);
                    console.log(resulte.success + "\n" + resulte.message);
                }
            }catch(error){
                alert("error in load data : \n" + error);
            }
        }
        LoadData();
    },[])

    const columns = [
        { name: "Id", Header: "Id", width: "5%", className: "text-center" },
        { name: "Request Type", Header: "Request Type", width: "15%", className: "text-center" },
        { name: "Matricule1", Header: "Matricule1", width: "15%", className: "text-center" },
        { name: "NewValue1", Header: "NewValue1", width: "10%", className: "text-center" },
        { name: "Matricule2", Header: "Matricule2", width: "15%", className: "text-center" },
        { name: "NewValue2", Header: "NewValue2", width: "10%", className: "text-center" },
        { name: "SubmissionDate", Header: "Submission Date", width: "12%", className: "text-center" },
        { name: "LastUpdatedDate", Header: "LastUpdated Date", width: "13%", className: "text-center " },
        { name: "YesNoButtons", Header: "Action Date", width: "15%", className: "text-center" },
    ];

    return (
     

 <div className="-2 bg-gray-100 min-h-screen rounded-lg shadow-md">
            {/* Filter bar */}
            <div className="flex flex-wrap justify-between items-center gap-4 bg-white rounded-lg shadow-lg p-4 border border-gray-300 mb-6">
                <div className="flex flex-wrap justify-start items-center gap-4 "> 
                     <ComboBoxStyle1
                    Name="Type of Request"
                    options={searchOptions}
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    comboBoxClassName="rounded-md shadow-sm h-10"
                />
                <ComboBoxStyle1
                    Name="Year (Niveau)"
                    options={yearOptionsTexts}
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    comboBoxClassName="rounded-md shadow-sm h-10"
                />
             </div>
             </div>

            {/* Table display */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-6">
                <DataGridViewStyle2 Columns={columns} Data={filteredData} setData={setData} 
                className=""/>
            </div>
        </div>
    );}