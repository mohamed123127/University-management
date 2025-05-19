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
    const [selectedDemande, setSelectedDemande] = useState('Group');
    const [matricule1, setmatricule1] = useState('');
    const [matricule2, setmatricule2] = useState('');
  
      const [currentDay,setCurrentDay] = useState('');
    const [currentHour,setCurrentHour] = useState('');
    const [newDay,setNewDay] = useState('');
    const [newHour,setNewHour] = useState('');
    const [newValue1, setNewValue1] = useState(''); // بدل matricule1
    const [newValue2, setNewValue2] = useState(''); // بدل matricule2

    const [submittedRequests, setSubmittedRequests] = useState([]);

    const demandeOptions = [
        'Group',
        'Section',
        'Speciality',
        'LessonTiming'
    ];



    const groupOptions = ['1', '2', '3', '4', '5'];
    const sectionOptions = ['1','2'];
    const days = ['Saturday','Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    const hours = ['8:00 - 9:30', '9:40 - 11:10', '11:20 - 12:50', '13:00 - 14:30', '14:40 - 16:10','16:20 - 17:50'];

    useEffect(()=>{
        const loadData =async()=>{
            const data = await VirtualRequests.getById(studentData.Id);
            setData(await VirtualRequests.getById(studentData.Id));
            console.log(data);
        }
         loadData();

    
    },[])
    useEffect(()=>{
        setSelectedDemande("Group");
      },[])
    const specialityOptions = ['Isil', 'Si'];

    const columns = [
        { name: "Id", Header: t('ID'), width: "5%" },
        { name: "Type", Header: t('RequestType'), width: "15%" },
        { name: "Status", Header: t('Status'), width: "10%" },
        { name: "Matricule1", Header: t('Matricule 1'), width: "10%" },
        { name: "NewValue1", Header: t('Value 1'), width: "10%" },
        { name: "Matricule2", Header: t('Matricule 2'), width: "10%" },
        { name: "NewValue2", Header: t('Value 2'), width: "10%" },
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
            return [newValue1,newValue2];
        }
        else if(selectedDemande === t('Section'))
        {
            return [newValue1,newValue2];
        }
        else if(selectedDemande === t('Speciality'))
        {
            return [newValue1,newValue2];
        }
        else if(selectedDemande === t('LessonTiming'))
            {
                return [currentDay + " " + currentHour,newDay + " " + newHour];
            }
    }
    const addButtonHandled = async () => {
        try {
          const [newVal1, newVal2] = getNewValue(); 

          if(selectedDemande === t('LessonTiming')){
            const result = await ChangeRequests.add({
              type: selectedDemande,
              newValue1: newVal1,
              newValue2: newVal2,
              studentId: studentData.Id,
             matricule1: "-", 
             matricule2: "-"  
          });
  
          if (result.success === true) {
  
              const newData = {
                  Type: selectedDemande,
                  NewValue1: newVal1,
                  NewValue2: newVal2,
                  Matricule1: "-", 
                  Matricule2: "-", 
                  Status: "Pending",
                  SubmissionDate: new Date().toLocaleDateString('en-CA'),
                  LastUpdatedDate: new Date().toLocaleDateString('en-CA'),
              };
  
              
              setData((prevData) => [...prevData, newData]);
  
          } else {
              alert(result.success + "  \n" + result.message);
          }
          }else{    
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
                    NewValue1: newVal1,
                    NewValue2: newVal2,
                    Matricule1: matricule1, 
                    Matricule2: matricule2, 
                    Status: "Pending",
                    SubmissionDate: new Date().toLocaleDateString('en-CA'),
                    LastUpdatedDate: new Date().toLocaleDateString('en-CA'),
                };
    
                
                setData((prevData) => [...prevData, newData]);
    
            } else {
                alert(result.success + "  \n" + result.message);
            }
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
          <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-4 bg-gray-100 border p-2 rounded-lg shadow-md border-gray-300">
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
              value={newValue1} 
              onChange={(e) => setNewValue1(e.target.value)} 
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
              value={newValue2} 
              onChange={(e) => setNewValue2(e.target.value)} 
              comboBoxClassName="h-8 w-full sm:w-auto rounded-md shadow-sm"
            />
          </div>
        )}
    
        {selectedDemande === t('Section') && (
          <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-4 bg-gray-100 border p-2 rounded-lg shadow-md border-gray-300">
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
              value={newValue1}
              onChange={(e) => setNewValue1(e.target.value)}
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
              value={newValue2} 
              onChange={(e) => setNewValue2(e.target.value)}
              comboBoxClassName="h-8 w-full sm:w-auto rounded-md shadow-sm"
            />
          </div>
        )}
    
        {selectedDemande === t('Speciality') && (
          <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-4 bg-gray-100 border p-1 rounded-lg shadow-md border-gray-300">
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
              value={newValue1}
              onChange={(e) => setNewValue1(e.target.value)}
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
              value={newValue2}
              onChange={(e) => setNewValue2(e.target.value)}
              comboBoxClassName="h-8 w-full sm:w-auto rounded-md shadow-sm"
            />
          </div>
        )}
    
    {selectedDemande === t('LessonTiming') && (
                <div className="flex items-center">
                    <p className={`text-[#374151] font-semibold`}>{t('CurrentDay')}</p>
                    <ComboBoxStyle1 options={days} value={currentDay} onChange={(e) => setCurrentDay(e.target.value)} comboBoxClassName="h-8 rounded-md shadow-sm ltr:ml-1 rtl:mr-1 ltr:mr-4 rtl:ml-4 " />
                    <p className={`text-[#374151] font-semibold`}>{t('CurrentHour')}</p>                   
                    <ComboBoxStyle1 options={hours} value={currentHour} onChange={(e) => setCurrentHour(e.target.value)} comboBoxClassName="h-8 rounded-md shadow-sm ltr:ml-1 rtl:mr-1 ltr:mr-4 rtl:ml-4 " />
                    <p className={`text-[#374151] font-semibold`}>{t('NewDay')}</p>
                    <ComboBoxStyle1 options={days} value={newDay} onChange={(e) => setNewDay(e.target.value)} comboBoxClassName="h-8 rounded-md shadow-sm ltr:ml-1 rtl:mr-1 ltr:mr-4 rtl:ml-4 " />
                    <p className={`text-[#374151] font-semibold`}>{t('NewHour')}</p>                   
                    <ComboBoxStyle1 options={hours} value={newHour} onChange={(e) => setNewHour(e.target.value)} comboBoxClassName="h-8 rounded-md shadow-sm ltr:ml-1 rtl:mr-1" />
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