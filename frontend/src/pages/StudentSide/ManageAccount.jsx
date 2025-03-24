import React, { useState, useTransition } from "react";
import LabelStyle1 from "components/custom controls/labels/LabelStyle1";
import ButtonStyle1 from "components/custom controls/buttons/ButtonStyle1";
import ComboBoxStyle1 from "components/custom controls/combo box/ComboBoxStyle1";
import TextBoxStyle2 from "components/custom controls/textBox/TextBoxStyle2";
import { useTranslation } from 'react-i18next';
import ChangeRequests from "js/models/ChangeRequests";
import { AlertTriangle } from "lucide-react";

export default function ManageAccount({StudentData}) {
  const [accountData, setAccountData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [newValue, setNewValue] = useState('');
  const { t } = useTranslation();
  const AccountManagmentFields = ['FirstName','LastName','Email','Password'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData((prevData) => ({ ...prevData, [name]: value }));
    setError('');
  };

  const handleComboChange = (e) => {
    setSelectedField(e.target.value);
    setNewValue('');
  };

  const handleNewValueChange = (e) => {
    setNewValue(e.target.value);
  };

  const handleComboSubmit = (e) => {
    setError("error");
    /*
    e.preventDefault();
    if (!selectedField || !newValue) {
      setError(t('CompleteYourDataToLoginMessage'));
      return;
    }
    setAccountData((prevData) => ({ ...prevData, [selectedField]: newValue }));
    setSuccessMessage(`${selectedField} has been successfully updated.`);
    setSelectedField('');
    setNewValue('');*/
  };

  const getOldValue = ()=>{
    if(selectedField === t('FirstName'))
    {
        return StudentData.FirstName;
    }
    else if(selectedField === t('LastName'))
    {
        return StudentData.LastName;
    }
    else if(selectedField === t('Email'))
    {
        return StudentData.Email;
    }
    else if(selectedField === t('Password'))
      {
          return StudentData.Password;
      }
}



 const UpdateFieldButtonHandled = async (e)=>{
  e.preventDefault();
  try{
    //alert(selectedField);
    const result = await ChangeRequests.add({
        "type":selectedField,
        "oldValue":getOldValue(),
        "newValue":newValue,
        "studentId":StudentData.Id
    });
    //alert(result);
    if (result.success === true) {
        //alert("تم اضافة طلبك");
        setError(null);
        setSuccessMessage("تم اضافة طلبك");
    } else {
        //alert(result.success + " \n" + result.message);
        setSuccessMessage(null);
        setError(result.success + " \n" + result.message);
    }
}catch(error) {
    alert("catch in addButtonHandled in visual request" + error);
}
 }

  return (
    <div className="p-2 mt-16 flex justify-center">
      <div className="flex flex-col justify-between bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[95%] lg:w-[80%]">
      <div className="flex flex-col justify-between">
      <form className="flex w-full h-fit mb-8">
        <div className={`flex flex-col space-y-4 md:space-y-0 md:flex-row ${selectedField ? "flex-1" : ""}`}>
          <div className={`flex items-center space-x-2 w-full ${selectedField ? "md:w-1/2" : "md:w-96"}`}>
            <LabelStyle1 labelText={t('SelectField')} labelClassName={`text-lg whitespace-nowrap font-semibold ${selectedField ? "w-[108px]" : "w-fit"} md:w-full text-gray-700`}/>
            <ComboBoxStyle1 options={AccountManagmentFields} onChange={handleComboChange} value={selectedField} comboBoxClassName={`h-10 px-3 ${selectedField ? "ml-3" : "ml-0"}  md:ml-0 w-full rounded-lg focus:ring-2 focus:ring-blue-500`}/>
          </div>
          {selectedField && (
          <div className="flex items-center space-x-2 w-full md:w-1/2">
            <LabelStyle1 labelText={t("NewField", { field: t(selectedField) })} labelClassName="text-lg whitespace-nowrap font-semibold text-gray-700" />
            <TextBoxStyle2 textBoxClassName="h-10 px-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500" value={newValue} onChange={handleNewValueChange} />
          </div>)}
        </div>
        <div className="flex items-start md:items-center ml-2">
            <ButtonStyle1 buttonText={t('UpdateField')} buttonClassName="h-10 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition" onClick={UpdateFieldButtonHandled}/>
        </div>
      </form>
      <div className="flex flex-col space-y-4 w-full">
        <div className="w-full">
          <div className="flex space-x-4">
            <div className="flex flex-col h-16 w-1/2">
              <LabelStyle1 labelText="First Name" labelClassName="text-lg whitespace-nowrap font-semibold text-gray-700"/>
              <TextBoxStyle2 type="text" name="firstName" placeholder="" value={StudentData.FirstName} onChange={handleChange} className="flex-1 w-full" />
            </div>
            <div className="flex flex-col h-16 w-1/2">
              <LabelStyle1 labelText="Last Name" labelClassName="text-lg whitespace-nowrap font-semibold text-gray-700 "/>
              <TextBoxStyle2 type="text" name="lastName" placeholder="" value={StudentData.LastName} onChange={handleChange} className="flex-1 w-full" />
            </div>
          </div>          
        </div>
        <div className="w-full">
        <div className="flex space-x-4">
            <div className="flex flex-col h-16 w-1/2">
              <LabelStyle1 labelText="Email" labelClassName="text-lg whitespace-nowrap font-semibold text-gray-700"/>
              <TextBoxStyle2 type="text" name="email" placeholder="" value={StudentData.Email} onChange={handleChange} className="flex-1 w-full" />
            </div>
            <div className="flex flex-col h-16 w-1/2">
              <LabelStyle1 labelText="Password" labelClassName="text-lg whitespace-nowrap font-semibold text-gray-700"/>
              <TextBoxStyle2 type="text" name="password" placeholder="" value={StudentData.Password} onChange={handleChange} className="flex-1 w-full" />
            </div>
          </div>     
        </div>
        </div>
        </div>
      {error && (
              <p className="text-red-500 text-center mt-4">{error}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-center mt-4">{successMessage}</p>
            )}
      </div>
    </div>
  );
}
