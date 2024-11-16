import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ComboBoxStyle1 from 'components/custom controls/combo box/ComboBoxStyle1';
import ButtonStyle1 from 'components/custom controls/buttons/ButtonStyle1';
import TextBoxStyle2 from 'components/custom controls/textBox/TextBoxStyle2';
import DataGridView from 'components/custom controls/data grid view/dataGridViewStyle1';
import Language from 'components/Basics/Language';

const studentData = {
    group: '5',
    section: 'section 1',
    speciality: 'isil',
};

function GroupChangeRequest() {
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
        t('changeGroup'),
        t('changeSection'),
        t('changeSpeciality')
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
        {
            ID: "1",
            RequestType: "Change Group",
            Status: "Pending",
            CurrentValue: "Group 5",
            NewValue: "Group 4",
            Submission_Date: "2024-11-01",
            Last_Updated_Date: "2024-11-05"
        },
        {
            ID: "2",
            RequestType: "Change Section",
            Status: "Approved",
            CurrentValue: "Section 1",
            NewValue: "Section 2",
            Submission_Date: "2024-10-25",
            Last_Updated_Date: "2024-10-30"
        },
        {
            ID: "3",
            RequestType: "Change Speciality",
            Status: "Rejected",
            CurrentValue: "ISIL",
            NewValue: "SI",
            Submission_Date: "2024-11-10",
            Last_Updated_Date: "2024-11-12"
        },
        {
            ID: "4",
            RequestType: "Change Group",
            Status: "Pending",
            CurrentValue: "Group 3",
            NewValue: "Group 2",
            Submission_Date: "2024-11-08",
            Last_Updated_Date: "2024-11-09"
        },
        {
            ID: "5",
            RequestType: "Change Section",
            Status: "Approved",
            CurrentValue: "Section 3",
            NewValue: "Section 1",
            Submission_Date: "2024-11-03",
            Last_Updated_Date: "2024-11-04"
        }
    ];

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);

    const handleLanguageChange = (lang) => {
        setCurrentLanguage(lang);
    };

    return (
        <div className="h-screen bg-gray-200 p-4">
            <div className="h-full bg-white rounded-lg shadow-lg w-full p-6">
                {/* Form Section */}
                <div className="flex items-center space-x-4 mb-4">
                    <ComboBoxStyle1
                        Name="Type of demande"
                        options={demandeOptions}
                        value={selectedDemande}
                        onChange={(e) => setSelectedDemande(e.target.value)}
                        comboBoxClassName="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    {selectedDemande === t('changeGroup') && (
                        <div className="flex items-center space-x-4">
                            <TextBoxStyle2
                                Name="Current Group"
                                value={currentGroup}
                                readOnly={true}
                                textBoxClassName="p-2 border border-gray-300 rounded-md bg-gray-200 shadow-sm"
                            />
                            <ComboBoxStyle1
                                Name="New Group"
                                options={groupOptions}
                                value={newGroup}
                                onChange={(e) => setNewGroup(e.target.value)}
                                comboBoxClassName="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                        </div>
                    )}

                    {selectedDemande === t('changeSection') && (
                        <div className="flex items-center space-x-4">
                            <TextBoxStyle2
                                Name="Current Section"
                                value={currentSection}
                                readOnly={true}
                                textBoxClassName="p-2 border border-gray-300 rounded-md bg-gray-200 shadow-sm"
                            />
                            <ComboBoxStyle1
                                Name="New Section"
                                options={sectionOptions}
                                value={selectedSection}
                                onChange={(e) => setSelectedSection(e.target.value)}
                                comboBoxClassName="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                        </div>
                    )}

                    {selectedDemande === t('changeSpeciality') && (
                        <div className="flex items-center space-x-4">
                            <TextBoxStyle2
                                Name="Current Speciality"
                                value={currentSpeciality}
                                readOnly={true}
                                textBoxClassName="p-2 border border-gray-300 rounded-md bg-gray-200 shadow-sm"
                            />
                            <ComboBoxStyle1
                                Name="New Speciality"
                                options={specialityOptions}
                                value={selectedSpeciality}
                                onChange={(e) => setSelectedSpeciality(e.target.value)}
                                comboBoxClassName="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            />
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-center mt-4 space-x-4">
                    <ButtonStyle1
                        buttonText={t('Add')}
                        buttonClassName="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    />
                    <ButtonStyle1
                        buttonText={t('Cancel')}
                        buttonClassName="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    />
                </div>

                {/* DataGridView Section */}
                {submittedRequests.length >= 0 && (
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">{t('submittedRequests')}</h3>
                        <DataGridView
                            Columns={columns}
                            Data={Data}
                            ClassName="table-auto ltr:ml-2 rtl:mr-2"
                        />
                    </div>
                )}
            </div>
            
            {/* Language Switcher */}
            <Language 
                onLanguageChange={handleLanguageChange}
                DefaultLanguage={currentLanguage} // Use currentLanguage as the default
                ClassName="mt-4"
                PrimaryButtonColor='blue'
            />
        </div>
    );
}

export default GroupChangeRequest;
