import React, { useState } from "react";
import LabelStyle1 from "components/custom controls/labels/LabelStyle1";
import ButtonStyle1 from "components/custom controls/buttons/ButtonStyle1";

export default function ManageAccount() {
  const [accountData, setAccountData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setError('');
  };

  const handleComboChange = (e) => {
    setSelectedField(e.target.value);
    setNewValue(''); // Reset the new value when changing the selection
  };

  const handleNewValueChange = (e) => {
    setNewValue(e.target.value);
  };

  const handleComboSubmit = (e) => {
    e.preventDefault();
    if (!selectedField || !newValue) {
      setError("Please select a field and provide a new value.");
      return;
    }

    setAccountData((prevData) => ({
      ...prevData,
      [selectedField]: newValue
    }));

    setSuccessMessage(`${selectedField} has been successfully updated.`);
    setSelectedField('');
    setNewValue('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = accountData;

    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setSuccessMessage("Account information has been successfully updated.");
  };

  return (
    <div className="flex flex-row w-full min-h-screen p-8 bg-gray-100 space-x-8">
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 text-blue-800 font-bold">Update Field</h2>
        <form className="flex flex-col space-y-4" onSubmit={handleComboSubmit}>
          <div className="flex flex-col">
            <LabelStyle1 labelText="Select Field" labelClassName="text-lg font-semibold mb-2" />
            <select
              value={selectedField}
              onChange={handleComboChange}
              className="w-full border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 p-3"
            >
              <option value="" disabled>Select a field to update</option>
              <option value="firstName">First Name</option>
              <option value="lastName">Last Name</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
            </select>
          </div>

          {selectedField && (
            <div className="flex flex-col">
              <LabelStyle1
                labelText={`New ${selectedField}`}
                labelClassName="text-lg font-semibold mb-2"
              />
              <input
                type="text"
                placeholder={`Enter new ${selectedField}`}
                value={newValue}
                onChange={handleNewValueChange}
                className="w-full border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 p-3"
              />
            </div>
          )}

          <ButtonStyle1
            buttonText="Update Field"
            onClick={handleComboSubmit}
            buttonClassName="w-full py-3 font-semibold text-lg"
          />
        </form>
      </div>


      <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 text-blue-800 font-bold">Manage Account Information</h2>
        <form className="flex flex-col space-y-6" onSubmit={handleFormSubmit}>
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col w-1/2">
              <LabelStyle1 labelText="First Name" labelClassName="text-lg font-semibold mb-2" />
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={accountData.firstName}
                onChange={handleChange}
                className="w-full border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 p-3"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <LabelStyle1 labelText="Last Name" labelClassName="text-lg font-semibold mb-2" />
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={accountData.lastName}
                onChange={handleChange}
                className="w-full border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 p-3"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <LabelStyle1 labelText="Email" labelClassName="text-lg font-semibold mb-2" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={accountData.email}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 p-3"
            />
          </div>

          <div className="flex flex-col">
            <LabelStyle1 labelText="Password" labelClassName="text-lg font-semibold mb-2" />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={accountData.password}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 p-3"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          <ButtonStyle1
            buttonText="Save Changes"
            onClick={handleFormSubmit}
            buttonClassName="w-full py-3 font-semibold text-lg"
          />
        </form>
      </div>
    </div>
  );
}
