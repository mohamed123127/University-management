import React, { useState, useTransition } from "react";
import LabelStyle1 from "components/custom controls/labels/LabelStyle1";
import ButtonStyle1 from "components/custom controls/buttons/ButtonStyle1";
import ComboBoxStyle1 from "components/custom controls/combo box/ComboBoxStyle1";
import TextBoxStyle2 from "components/custom controls/textBox/TextBoxStyle2";
import { useTranslation } from 'react-i18next';
import ChangeRequests from "js/models/ChangeRequests";

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



 const UpdateFieldButtonHandled = async ()=>{
  try{
    const result = await ChangeRequests.add({
        "type":selectedField,
        "oldValue":getOldValue(),
        "newValue":newValue,
        "studentId":StudentData.Id
    })
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
    <div className="flex justify-center w-full h-screen bg-gradient-to-r bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-[80%] h-96 mt-12 max-w-4xl p-8">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-12">{t('manage_account')}</h1>
        <div className="flex">




        <form className="flex flex-col lg:flex-row items-center mb-6 space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex flex-col lg:flex-row items-center space-x-2">
            <LabelStyle1 
              labelText={t('SelectField')} 
              labelClassName="text-lg font-semibold text-gray-700" 
            />
            <ComboBoxStyle1 
              options={AccountManagmentFields} 
              onChange={handleComboChange} 
              value={selectedField} 
              comboBoxClassName="h-10 px-3 rounded-lg focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          {selectedField && (
  <div className="flex flex-col lg:flex-row items-center">
    <LabelStyle1 
      labelText={t("NewField", { field: t(selectedField) })} // ترجمة النص الديناميكي
      labelClassName="text-lg font-semibold text-gray-700" 
    />
    <TextBoxStyle2 
      textBoxClassName="h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mr-2 ml-2" 
      value={newValue} 
      onChange={handleNewValueChange} 
    />
  </div>
)}

        </form>
          <ButtonStyle1 
            buttonText={t('UpdateField')}
            buttonClassName="h-10 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition" 
            onClick={UpdateFieldButtonHandled}
          />
</div>

        <form 
          className="space-y-6"
        >
          <div className="space-y-6">
            <div className="flex w-full">
              <div className="flex flex-col w-1/2 space-y-2 ltr:mr-4 rtl:ml-4">
                <LabelStyle1 
                  labelText={`${t('FirstName')}:`} 
                  labelClassName="text-lg font-semibold text-gray-700" 
                />
                <TextBoxStyle2 
                  type="text" 
                  name="firstName" 
                  placeholder="" 
                  value={StudentData.FirstName} 
                  onChange={handleChange} 
                  className="flex-grow w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 p-2" 
                />
              </div>
              <div className="flex flex-col w-1/2 space-y-2 ">
                <LabelStyle1 
                  labelText={`${'LastName'}:`} 
                  labelClassName="text-lg font-semibold text-gray-700" 
                />
                <TextBoxStyle2 
                  type="text" 
                  name="lastName" 
                  placeholder="" 
                  value={StudentData.LastName} 
                  onChange={handleChange} 
                  className="flex-grow w-full  border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 p-2" 
                />
              </div>
            </div>
            <div className="flex w-full">
              <div className="flex flex-col w-1/2 space-y-2 ltr:mr-4 rtl:ml-4">
                <LabelStyle1 
                  labelText={`${'Email'}:`}
                  labelClassName="text-lg font-semibold text-gray-700" 
                />
                <TextBoxStyle2 
                  type="email" 
                  name="email" 
                  placeholder="" 
                  value={StudentData.Email} 
                  onChange={handleChange} 
                  className="flex-grow w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 p-2" 
                />
              </div>
              <div className="flex flex-col w-1/2 space-y-2">
                <LabelStyle1 
                  labelText={`${'Password'}:`} 
                  labelClassName="text-lg font-semibold text-gray-700" 
                />
                <TextBoxStyle2 
                  type="text" 
                  name="password" 
                  placeholder="" 
                  value={StudentData.Password} 
                  onChange={handleChange} 
                  className="flex-grow w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 p-2" 
                />
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-center mt-4">{error}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-center mt-4">{successMessage}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
