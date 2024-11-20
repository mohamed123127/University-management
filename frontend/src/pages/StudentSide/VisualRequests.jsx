import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ComboBoxStyle1 from 'components/custom controls/combo box/ComboBoxStyle1';
import ButtonStyle1 from 'components/custom controls/buttons/ButtonStyle1';
import TextBoxStyle2 from 'components/custom controls/textBox/TextBoxStyle2';
import DataGridView from 'components/custom controls/data grid view/dataGridViewStyle1';
import Language from 'components/Basics/Language';
import LabelStyle1 from 'components/custom controls/labels/LabelStyle1';

const studentData = {
    group: '5',
    section: 'section 1',
    speciality: 'isil',
};

export default function VisualRequests(){
    const { t, i18n } = useTranslation(); 
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
    const [selectedDemande, setSelectedDemande] = useState('');
    const [currentGroup] = useState(studentData.group);
    const [currentSection] = useState(studentData.section);
    const [currentSpeciality] = useState(studentData.speciality);
    const [newGroup, setNewGroup] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const [submittedRequests, setSubmittedRequests] = useState([]);

    const demandeOptions = [
        t('Group'),
        t('Section'),
        t('Speciality')
    ];

    const groupOptions = ['1', '2', '3', '4', '5'];
    const sectionOptions = [
        t('section1'), 
        t('section2')
    ];

    const specialityOptions = ['ISIL', 'SI'];

    const columns = [
        { name: "ID", Header: t('ID'), width: "80px" },
        { name: "RequestType", Header: t('RequestType'), width: "20%" },
        { name: "Status", Header: t('Status'), width: "15%" },
        { name: "CurrentValue", Header: t('CurrentValue'), width: '20%' },
        { name: "NewValue", Header: t('NewValue'), width: '20%' },
        { name: "Submission_Date", Header: t('SubmissionDate'), width: "12%" },
        { name: "Last_Updated_Date", Header: t('LastUpdatedDate'), width: "13%" }
    ];
    
    const Data = [
        
    ];

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);

    const handleLanguageChange = (lang) => {
        setCurrentLanguage(lang);
    };

    return (
    <div className="h-full bg-gray-100 rounded-lg shadow-lg w-full">
        <div className="flex justify-start items-center rounded-lg shadow-md space-x-1 bg-gray-100 border m-2 p-2 border-gray-300">
        <p className={`text-[#374151] font-bold`}>Request Type:</p>
        <ComboBoxStyle1 Name="Type of demande" options={demandeOptions} value={selectedDemande} onChange={(e) => setSelectedDemande(e.target.value)} comboBoxClassName="h-8 ml-1 mr-2 rounded-md shadow-sm"/>
            {selectedDemande === t('Group') && (
                <div className="flex items-center space-x-1">
                    <p className={`text-[#374151] font-semibold`}>{'Current ' + selectedDemande + ':'}</p>
                    <TextBoxStyle2 Name="Current Group" value={currentGroup} readOnly={true} textBoxClassName="p-2 border h-8 w-20 text-center border-gray-300 rounded-md bg-gray-200 shadow-sm mr-2" />
                    <p className={`text-[#374151] font-semibold`}>{'New ' + selectedDemande + ':'}</p>
                    <ComboBoxStyle1 Name="New Group" options={groupOptions} value={newGroup} onChange={(e) => setNewGroup(e.target.value)} comboBoxClassName="h-8 rounded-md shadow-sm mr-2" />
                </div>
            )}
            {selectedDemande === t('Section') && (
                <div className="flex items-center space-x-1">
                    <p className={`text-[#374151] font-semibold`}>{'Current ' + selectedDemande + ':'}</p>
                    <TextBoxStyle2 Name="Current Section" value={currentSection} readOnly={true} textBoxClassName="p-2 border h-8 w-20 text-center border-gray-300 rounded-md bg-gray-200 shadow-sm" />
                    <p className={`text-[#374151] font-semibold`}>{'New ' + selectedDemande + ':'}</p>
                    <ComboBoxStyle1 Name="New Section" options={sectionOptions} value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} comboBoxClassName="h-8 rounded-md shadow-sm" />
                </div>
            )}
            {selectedDemande === t('Speciality') && (
                <div className="flex items-center space-x-1">
                    <p className={`text-[#374151] font-semibold`}>{'Current ' + selectedDemande + ':'}</p>
                    <TextBoxStyle2 Name="Current Speciality" value={currentSpeciality} readOnly={true} textBoxClassName="p-2 border h-8 w-20 text-center border-gray-300 rounded-md bg-gray-200 shadow-sm" />
                    <p className={`text-[#374151] font-semibold`}>{'New ' + selectedDemande + ':'}</p>                   
                    <ComboBoxStyle1 Name="New Speciality" options={specialityOptions} value={selectedSpeciality} onChange={(e) => setSelectedSpeciality(e.target.value)} comboBoxClassName="h-8 rounded-md shadow-sm" />
                </div>
            )} 
            <ButtonStyle1 buttonText={t('Add')} buttonClassName="w-20 bg-blue-500 text-white rounded-md h-8 font-bold text-center hover:bg-blue-600" />
        </div>
        <DataGridView Columns={columns} Data={Data} ClassName="table-auto ltr:ml-2 rtl:mr-2" />        
    </div>
    );
}