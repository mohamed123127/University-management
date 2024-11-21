import React, { useState, useTransition } from "react";
import LabelStyle1 from "components/custom controls/labels/LabelStyle1";
import ButtonStyle1 from "components/custom controls/buttons/ButtonStyle1";
import ComboBoxStyle1 from "components/custom controls/combo box/ComboBoxStyle1";
import TextBoxStyle2 from "components/custom controls/textBox/TextBoxStyle2";
import { useTranslation } from 'react-i18next';

export default function ManageAccount() {
  const [accountData, setAccountData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [newValue, setNewValue] = useState('');
  const { t } = useTranslation();
  const AccountManagmentFields = [t('FirstName'), t('LastName'), t('Email'), t('Password')];

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

 

  return (
    <div className="flex justify-center w-full h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white rounded-lg shadow-lg w-[80%] h-96 mt-12 max-w-4xl p-8">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-12">{t('manage_account')}</h1>
        <form onSubmit={handleComboSubmit} className="flex flex-col lg:flex-row items-center mb-6 space-y-4 lg:space-y-0 lg:space-x-4">
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
            <div className="flex flex-col lg:flex-row items-center space-x-2">
              <LabelStyle1 
                labelText={`New ${selectedField}:`} 
                labelClassName="text-lg font-semibold text-gray-700" 
              />
              <TextBoxStyle2 
                textBoxClassName="h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                value={newValue} 
                onChange={handleNewValueChange} 
              />
            </div>
          )}
          <ButtonStyle1 
            buttonText={t('UpdateField')}
            buttonClassName="h-10 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition" 
          />
        </form>


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
                  value={accountData.firstName} 
                  onChange={handleChange} 
                  className="flex-grow w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 p-2" 
                />
              </div>
              <div className="flex flex-col w-1/2 space-y-2 ">
                <LabelStyle1 
                  labelText={`${t('LastName')}:`} 
                  labelClassName="text-lg font-semibold text-gray-700" 
                />
                <TextBoxStyle2 
                  type="text" 
                  name="lastName" 
                  placeholder="" 
                  value={accountData.lastName} 
                  onChange={handleChange} 
                  className="flex-grow w-full  border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 p-2" 
                />
              </div>
            </div>
            <div className="flex w-full">
              <div className="flex flex-col w-1/2 space-y-2 ltr:mr-4 rtl:ml-4">
                <LabelStyle1 
                  labelText={`${t('Email')}:`}
                  labelClassName="text-lg font-semibold text-gray-700" 
                />
                <TextBoxStyle2 
                  type="email" 
                  name="email" 
                  placeholder="" 
                  value={accountData.email} 
                  onChange={handleChange} 
                  className="flex-grow w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 p-2" 
                />
              </div>
              <div className="flex flex-col w-1/2 space-y-2">
                <LabelStyle1 
                  labelText={`${t('Password')}:`} 
                  labelClassName="text-lg font-semibold text-gray-700" 
                />
                <TextBoxStyle2 
                  type="password" 
                  name="password" 
                  placeholder="" 
                  value={accountData.password} 
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
