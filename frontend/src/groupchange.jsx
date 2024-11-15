import React, { useState } from 'react';
import ComboBoxStyle1 from 'components/custom controls/combo box/ComboBoxStyle1';
import ButtonStyle1 from 'components/custom controls/buttons/ButtonStyle1';
import TextBoxStyle2 from 'components/custom controls/textBox/TextBoxStyle2';

function GroupChangeRequest() {
    const [selectedDemande, setSelectedDemande] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const [selectedSection, setSelectedSection] = useState('');

    const demandeOptions = [
        'change groupe',
        'change section',
        'change speciality',
    ];

    const groupOptions = ['1', '2', '3', '4', '5'];
    const specialityOptions = ['ISIL', 'SI'];
    const sectionOptions = ['section1', 'section2'];

    const handleDemandeChange = (e) => {
        setSelectedDemande(e.target.value);
        setSelectedGroup('');
        setSelectedSpeciality('');
        setSelectedSection('');
    };

    const handleGroupChange = (e) => {
        setSelectedGroup(e.target.value);
    };

    const handleSpecialityChange = (e) => {
        setSelectedSpeciality(e.target.value);
    };

    const handleSectionChange = (e) => {
        setSelectedSection(e.target.value);
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-2xl">
            <div className="flex items-center space-x-4">
              

                <ComboBoxStyle1
                    Name="Type of demande"
                    options={demandeOptions}
                    value={selectedDemande}
                    onChange={handleDemandeChange}
                    comboBoxClassName="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                {selectedDemande === 'change groupe' && (
                    <ComboBoxStyle1
                        Name="Select Group"
                        options={groupOptions}
                        value={selectedGroup}
                        onChange={handleGroupChange}
                        comboBoxClassName="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                )}

                {selectedDemande === 'change section' && (
                    <ComboBoxStyle1
                        Name="Select Section"
                        options={sectionOptions}
                        value={selectedSection}
                        onChange={handleSectionChange}
                        comboBoxClassName="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                )}

                {selectedDemande === 'change speciality' && (
                    <ComboBoxStyle1
                        Name="Select Speciality"
                        options={specialityOptions}
                        value={selectedSpeciality}
                        onChange={handleSpecialityChange}
                        comboBoxClassName="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                )}
            </div>

            <div className="flex justify-center mt-4 space-x-4">
                <ButtonStyle1
                    buttonText="Submit"
                    buttonClassName="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                />
                <ButtonStyle1
                    buttonText="Cancel"
                    buttonClassName="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                />
            </div>
        </div>
    );
}

export default GroupChangeRequest;
