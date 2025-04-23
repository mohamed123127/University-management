
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ComboBoxStyle1 from 'components/custom controls/combo box/ComboBoxStyle1';
import ButtonStyle1 from 'components/custom controls/buttons/ButtonStyle1';
import TextBoxStyle2 from 'components/custom controls/textBox/TextBoxStyle2';
import DataGridView from 'components/custom controls/data grid view/dataGridViewStyle1';
import Language from 'components/Basics/Language';
import LabelStyle1 from 'components/custom controls/labels/LabelStyle1';
import ChangeRequests from 'js/models/ChangeRequests';
import { VirtualRequests } from 'js/models/VirtualRequest';

export default function VisualRequests({selectedRequest,studentData=[]}){
    const { t, i18n } = useTranslation(); 
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
    const [selectedDemande, setSelectedDemande] = useState('');
    const [currentGroup] = useState(studentData.group);
    const [currentSection] = useState(studentData.section);
    const [currentSpeciality] = useState(studentData.speciality);
    const [matricule1, setmatricule1] = useState('');
    const [matricule2, setmatricule2] = useState('');
    const [newGroup1, setNewGroup1] = useState('');
    const [newGroup2, setNewGroup2] = useState('');
    const [newSection1, setSelectedSection1] = useState('');
    const [newSection2, setSelectedSection2] = useState('');
    const [newSpeciality1, setSelectedSpeciality1] = useState('');
    const [newSpeciality2, setSelectedSpeciality2] = useState('');
    const [submittedRequests, setSubmittedRequests] = useState([]);

    const demandeOptions = [
        'Group',
        'Section',
        'Speciality'
    ];



    const groupOptions = ['1', '2', '3', '4', '5'];
    const sectionOptions = ['1','2'];
    //const [studentData,setStudentData] = useState(null);
    //useEffect(()=>{setStudentData(StudentData)},[])

    useEffect(()=>{
        const loadData =async()=>{
            setData(await VirtualRequests.getById(studentData.Id));
        }
         loadData();

    
    },[])
    useEffect(()=>{
        setSelectedDemande(selectedRequest);
      },[selectedRequest])
    const specialityOptions = ['Isil', 'Si'];

    const columns = [
        { name: "Type", Header: t('RequestType'), width: "15%" },
        { name: "Status", Header: t('Status'), width: "10%" },
        { name: "NewValue1", Header: t('New Value 1'), width: "15%" },
        { name: "Matricule1", Header: t('Matricule 1'), width: "10%" },
        { name: "Matricule2", Header: t('Matricule 2'), width: "10%" },
        { name: "NewValue2", Header: t('New Value 2'), width: "15%" },
        { name: "SubmissionDate", Header: t('SubmissionDate'), width: "12%" },
        { name: "LastUpdatedDate", Header: t('LastUpdatedDate'), width: "13%" },
    ];
    
    
    const [data , setData]=useState([]);

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);

    const handleLanguageChange = (lang) => {
        setCurrentLanguage(lang);
    };

   

    const getNewValue = ()=>{
        if(selectedDemande === t('Group'))
        {
            return [newGroup1,newGroup2];
        }
        else if(selectedDemande === t('Section'))
        {
            return [newSection1,newSection2];
        }
        else if(selectedDemande === t('Speciality'))
        {
            return [newSpeciality1,newSpeciality2];
        }
    }
    const addButtonHandled = async () => {
        try {
            const [newVal1, newVal2] = getNewValue(); 
    
            const result = await ChangeRequests.add({
                type: selectedDemande,
                newValue1: newVal1,
                newValue2: newVal2,
                studentId: studentData.Id,
               matricule1: matricule1, 
               matricule2: matricule2  
            });
    
            if (result.success === true) {
    
                const newData = {
                    Type: selectedDemande,
                    newValue1: newVal1,
                    newValue2: newVal2,
                    matricule1: matricule1, 
                   matricule2: matricule2, 
                    Status: "Pending",
                    SubmissionDate: new Date().toLocaleDateString('en-CA'),
                    LastUpdatedDate: new Date().toLocaleDateString('en-CA'),
                };
    
                
                setData((prevData) => [...prevData, newData]);
    
            } else {
                alert(result.success + "  \n" + result.message);
            }
        } catch (error) {
            alert("catch in addButtonHandled in visual request" + error);
        }
    };
    

    return (
      <div className="p-1 h-full bg-gray-100 rounded-lg shadow-lg w-full ">
    <div className="flex flex-col md:flex-row flex-wrap justify-start items-start md:items-center gap-1 bg-gray-100 border-[1px] m-2 p-1 border-gray-300 rounded-md shadow-md">
    <p className="text-[#374151] font-bold">{t('RequestType')}</p>
    
        <ComboBoxStyle1 
          Name="Type of demande" 
          options={demandeOptions} 
          value={selectedDemande} 
          onChange={(e) => setSelectedDemande(e.target.value)} 
          comboBoxClassName="h-8 w-full sm:w-auto ml-1 mr-2 rounded-md shadow-sm"
        />
    
        {selectedDemande === t('Group') && (
          <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-2 bg-gray-100 border p-2 rounded-lg shadow-md border-gray-300">
            <p className="text-[#374151] font-semibold">{t('Matricule 1')}</p>
            <TextBoxStyle2 
              Name="Matricule 1" 
              value={matricule1} 
              onChange={(e) => setmatricule1(e.target.value)}
              textBoxClassName="p-2 border h-8 w-full sm:w-28 text-center border-gray-300 rounded-md shadow-sm"
            />
    
            <p className="text-[#374151] font-semibold">{t('NewGroup')}</p>
            <ComboBoxStyle1 
              Name="New Group 1" 
              options={groupOptions} 
              value={newGroup1} 
              onChange={(e) => setNewGroup1(e.target.value)} 
              comboBoxClassName="h-8 w-full sm:w-auto rounded-md shadow-sm"
            />
    
            <p className="text-[#374151] font-semibold">{t('Matricule 2')}</p>
            <TextBoxStyle2 
              Name="Matricule 2" 
              value={matricule2} 
              onChange={(e) => setmatricule2(e.target.value)}
              textBoxClassName="p-2 border h-8 w-full sm:w-28 text-center border-gray-300 rounded-md shadow-sm"
            />
    
            <p className="text-[#374151] font-semibold">{t('NewGroup')}</p>
            <ComboBoxStyle1 
              Name="New Group 2" 
              options={groupOptions} 
              value={newGroup2} 
              onChange={(e) => setNewGroup2(e.target.value)} 
              comboBoxClassName="h-8 w-full sm:w-auto rounded-md shadow-sm"
            />
          </div>
        )}
    
        {selectedDemande === t('Section') && (
          <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-1 bg-gray-100 border p-2 rounded-lg shadow-md border-gray-300">
            <p className="text-[#374151] font-semibold">{t('Matricule 1')}</p>
            <TextBoxStyle2
              Name="Matricule 1"
              value={matricule1} 
              onChange={(e) => setmatricule1(e.target.value)}
              textBoxClassName="p-2 border h-8 w-full sm:w-28 text-center border-gray-300 rounded-md shadow-sm"
            />
    
            <p className="text-[#374151] font-semibold">{t('NewSection')}</p>
            <ComboBoxStyle1
              Name="New Section 1"
              options={sectionOptions}
              value={newSection1}
              onChange={(e) => setSelectedSection1(e.target.value)}
              comboBoxClassName="h-8 w-full sm:w-auto rounded-md shadow-sm"
            />
    
            <p className="text-[#374151] font-semibold">{t('Matricule 2')}</p>
            <TextBoxStyle2
              Name="Matricule 2"
              value={matricule2} 
              onChange={(e) => setmatricule2(e.target.value)}   
              textBoxClassName="p-2 border h-8 w-full sm:w-28 text-center border-gray-300 rounded-md shadow-sm"
            />
    
            <p className="text-[#374151] font-semibold">{t('NewSection')}</p>
            <ComboBoxStyle1
              Name="New Section 2"
              options={sectionOptions}
              value={newSection2} 
              onChange={(e) => setSelectedSection2(e.target.value)}
              comboBoxClassName="h-8 w-full sm:w-auto rounded-md shadow-sm"
            />
          </div>
        )}
    
        {selectedDemande === t('Speciality') && (
          <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-1 bg-gray-100 border p-2 rounded-lg shadow-md border-gray-300">
            <p className="text-[#374151] font-semibold">{t('Matricule 1')}</p>
            <TextBoxStyle2
              Name="Matricule 1"
              value={matricule1} 
              onChange={(e) => setmatricule1(e.target.value)}
              textBoxClassName="p-2 border h-8 w-full sm:w-28 text-center border-gray-300 rounded-md shadow-sm"
            />
    
            <p className="text-[#374151] font-semibold">{t('NewSpeciality')}</p>
            <ComboBoxStyle1
              Name="New Speciality 1"
              options={specialityOptions}
              value={newSpeciality1}
              onChange={(e) => setSelectedSpeciality1(e.target.value)}
              comboBoxClassName="h-8 w-full sm:w-auto rounded-md shadow-sm"
            />
    
            <p className="text-[#374151] font-semibold">{t('Matricule 2')}</p>
            <TextBoxStyle2
              Name="Matricule 2"
              value={matricule2} 
              onChange={(e) => setmatricule2(e.target.value)}
              textBoxClassName="p-2 border h-8 w-full sm:w-28 text-center border-gray-300 rounded-md shadow-sm"
            />
    
            <p className="text-[#374151] font-semibold">{t('NewSpeciality')}</p>
            <ComboBoxStyle1
              Name="New Speciality 2"
              options={specialityOptions}
              value={newSpeciality2}
              onChange={(e) => setSelectedSpeciality2(e.target.value)}
              comboBoxClassName="h-8 w-full sm:w-auto rounded-md shadow-sm"
            />
          </div>
        )}
    
        <ButtonStyle1 
          onClick={addButtonHandled} 
          buttonText={'Add'} 
          buttonClassName="w-full sm:w-20 bg-blue-500 text-white rounded-md h-8 font-bold text-center hover:bg-blue-600" 
        />
      </div>
    
      <div className="overflow-x-auto border border-gray-300 rounded-md shadow-md ">
      <DataGridView Columns={columns} Data={data} ClassName="table-auto ltr:ml-0 rtl:mr-2 w-full" />
      </div>
    </div>
    
      
    );
    
}