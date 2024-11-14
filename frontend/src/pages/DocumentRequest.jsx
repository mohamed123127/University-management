import React, { useState } from "react";
import ButtonStyle1 from "components/custom controls/buttons/ButtonStyle1";
import ComboBoxStyle1 from "components/custom controls/combo box/ComboBoxStyle1";
import DataGridView from "../components/custom controls/data grid view/dataGridViewStyle1";
const columns = [
    { title: "Demande", width: "150px" },
    { title: "Document", width: "100px" },
    { title: "status", width: "150px" },
    { title: "Last_apdadte", width: "150px" }
  ];
  
  // تعريف البيانات لكل صف
  const data = [
    { Demande: "document", Document: "relver de note", status: "en attent",Last_apdadte:"xx/xx/xxxx" },
    { Demande: "document", Document: "parking carte ", status: "en attent",Last_apdadte:"xx/xx/xxxx" },
    { Demande: "document", Document: "certafica", status: "en attent",Last_apdadte:"xx/xx/xxxx" },
    { Demande: "document", Document: "certafica", status: "en attent",Last_apdadte:"xx/xx/xxxx" },
    { Demande: "document", Document: "wsh moooh!", status: "en attent",Last_apdadte:"xx/xx/xxxx" },
  
  ];
export default function DocumentRequests() {
    const demandeOptions = [
        'Transcript Request',
        'Certificate Of Enrollment',
        'Parking Permit',
        'Library Card',
        'Internship Permit',
        'Student ID Card',
        'Block Academic Year'
    ];
    const [docunentType, setdocunentType] = useState('');

   
    const handleChange = (e) => {
        const { value } = e.target;
        setdocunentType(value);
    };

    return (
        <div>
            <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md max-w-md">
                {/* ComboBoxStyle1 مع تعديلات التصميم */}
                <ComboBoxStyle1
                    Name="Type of demande"
                    options={demandeOptions}
                    value={docunentType}
                    onChange={handleChange}
                    comboBoxClassName="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                {/* زر الإضافة مع تحسينات التصميم */}
                <ButtonStyle1
                    buttonText="Add"
                    buttonClassName="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
                />
            </div>
            <div className="overflow-auto bg-white border border-gray-200 shadow-sm rounded-md">
              <DataGridView Columns={columns} Data={data} />
           </div>
        </div>
    );
}
