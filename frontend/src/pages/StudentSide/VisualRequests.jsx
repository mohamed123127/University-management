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
    const [newGroup, setNewGroup] = useState('');
    const [newSection, setSelectedSection] = useState('');
    const [newSpeciality, setSelectedSpeciality] = useState('');
    const [currentDay,setCurrentDay] = useState('');
    const [currentHour,setCurrentHour] = useState('');
    const [newDay,setNewDay] = useState('');
    const [newHour,setNewHour] = useState('');
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
    //const [studentData,setStudentData] = useState(null);
    //useEffect(()=>{setStudentData(StudentData)},[])

    useEffect(()=>{
        const loadData =async()=>{
            const data = await VirtualRequests.getById(studentData.Id);
            setData(await VirtualRequests.getById(studentData.Id));
            console.log(data);
        }
         loadData();

    
    },[])
    useEffect(()=>{
        setSelectedDemande(selectedRequest);
      },[selectedRequest])
    const specialityOptions = ['Isil', 'Si'];

    const columns = [
       
        { name: "Id", Header: t('ID'), width: "5%" },
        { name: "Type", Header: t('RequestType'), width: "20%" },
        { name: "Status", Header: t('Status'), width: "12%" },
        { name: "OldValue", Header: t('CurrentValue'), width: '20%' },
        { name: "NewValue", Header: t('NewValue'), width: '20%' },
        { name: "SubmissionDate", Header: t('SubmissionDate'), width: "12%" },
        { name: "LastUpdatedDate", Header: t('LastUpdatedDate'), width: "13%" }
    ];
    
    const [data , setData]=useState([]);

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
    }, [currentLanguage]);

    const handleLanguageChange = (lang) => {
        setCurrentLanguage(lang);
    };

    const getOldValue = ()=>{
        if(selectedDemande === t('Group'))
        {
            return studentData.Grp;
        }
        else if(selectedDemande === t('Section'))
        {
            return studentData.Section;
        }
        else if(selectedDemande === t('Speciality'))
        {
            return studentData.Speciality;
        }
        else if(selectedDemande === t('LessonTiming'))
            {
                return currentDay + " " + currentHour;
            }
    }

    const getNewValue = ()=>{
        if(selectedDemande === t('Group'))
        {
            return newGroup;
        }
        else if(selectedDemande === t('Section'))
        {
            return newSection;
        }
        else if(selectedDemande === t('Speciality'))
        {
            return newSpeciality;
        }
        else if(selectedDemande === t('LessonTiming'))
            {
                return newDay + " " + newHour;
            }
    }

    const addButtonHandled = async ()=>{
        try{
            const result = await ChangeRequests.add({
                "type":selectedDemande,
                "oldValue":getOldValue(),
                "newValue":getNewValue(),
                "studentId":studentData.Id

            })
            if (result.success === true) {
    
              const newData = {
              Type: selectedDemande, 
              OldValue: getOldValue(),
               NewValue: getNewValue(),
                Status : "Pending",
               SubmissionDate : new Date().toLocaleDateString('en-CA'),
                LastUpdatedDate: new Date().toLocaleDateString('en-CA')

    };

    // Add the new data to the state
    setData((prevData) => [...prevData, newData]);
                      

            } else {
                alert(result.success + "  \n" + result.message);
            }
        }catch(error) {
            alert("catch in addButtonHandled in visual request" + error);
        }
    }

    return (
    <div className="h-full bg-gray-100 rounded-lg shadow-lg w-full">
        <div className="flex justify-start items-center rounded-lg shadow-md space-x-1 bg-gray-100 border m-2 p-2 border-gray-300">
        <p className={`text-[#374151] font-bold`}>{t('RequestType')}</p>
        <ComboBoxStyle1 Name="Type of demande" options={demandeOptions} value={selectedDemande} onChange={(e) => setSelectedDemande(e.target.value)} comboBoxClassName="h-8 ml-1 mr-2 rounded-md shadow-sm"/>
            {selectedDemande === t('Group') && (
                <div className="flex items-center">
                    <p className={`text-[#374151] font-semibold`}>{t('CurrentGroup')}</p>
                    <TextBoxStyle2 Name="Current Group" value={studentData.Grp} readOnly={true} textBoxClassName="p-2 border h-8 w-20 text-center border-gray-300 rounded-md bg-gray-200 shadow-sm ml-1 mr-1" />
                    <p className={`text-[#374151] font-semibold`}>{t('NewGroup')}</p>
                    <ComboBoxStyle1 Name="New Group" options={groupOptions} value={newGroup} onChange={(e) => setNewGroup(e.target.value)} comboBoxClassName="h-8 rounded-md shadow-sm ltr:ml-1 rtl:mr-1" />
                </div>
            )}
            {selectedDemande === t('Section') && (
                <div className="flex items-center">
                    <p className={`text-[#374151] font-semibold`}>{t('CurrentSection')}</p>
                    <TextBoxStyle2 Name="Current Section" value={studentData.Section} readOnly={true} textBoxClassName="p-2 border h-8 w-20 text-center border-gray-300 rounded-md bg-gray-200 shadow-sm ml-1 mr-1" />
                    <p className={`text-[#374151] font-semibold`}>{t('NewSection')}</p>
                    <ComboBoxStyle1 Name="New Section" options={sectionOptions} value={newSection} onChange={(e) => setSelectedSection(e.target.value)} comboBoxClassName="h-8 rounded-md shadow-sm ltr:ml-1 rtl:mr-1" />
                </div>
            )}
            {selectedDemande === t('Speciality') && (
                <div className="flex items-center">
                    <p className={`text-[#374151] font-semibold`}>{t('CurrentSpeciality')}</p>
                    <TextBoxStyle2 Name="Current Speciality" value={studentData.Speciality} readOnly={true} textBoxClassName="p-2 border h-8 w-20 text-center border-gray-300 rounded-md bg-gray-200 shadow-sm ml-1 mr-1" />
                    <p className={`text-[#374151] font-semibold`}>{t('NewSpeciality')}</p>                   
                    <ComboBoxStyle1 Name="New Speciality" options={specialityOptions} value={newSpeciality} onChange={(e) => setSelectedSpeciality(e.target.value)} comboBoxClassName="h-8 rounded-md shadow-sm ltr:ml-1 rtl:mr-1" />
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
            <ButtonStyle1 onClick={addButtonHandled} buttonText={'Add'} buttonClassName="w-20 bg-blue-500 text-white rounded-md h-8 font-bold text-center hover:bg-blue-600" />
        </div>
        <DataGridView Columns={columns} Data={data} ClassName="table-auto ltr:ml-2 rtl:mr-2" />        
    </div>
    );
    
}