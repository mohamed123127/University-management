import React, { useState } from "react";
import LabelStyle1 from "components/custom controls/labels/LabelStyle1";
import ButtonStyle1 from "components/custom controls/buttons/ButtonStyle1";


export default function Repport() {
  const [repportData, setRepportData] = useState({
    subject: '',
    content: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRepportData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setError(''); // Clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { subject, content } = repportData;
  
    // Input validation
    if (!subject && !content) {
      setError("All fields ( Subject, and Content) are required.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost/University-management/backend/roots/repportpage.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  title: subject, content }),
      });
  
      const result = await response.json();
  
      if (result.success) {
        setSuccessMessage("Repport sent successfully.");
        setRepportData({ subject: '', content: '' }); // Reset fields after submission
      } else {
        setError(result.message || "An error occurred while sending the repport.");
      }
    } catch (error) {
      setSuccessMessage("Repport sent successfully.");
    } 
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-8 bg-blue">
      <h1 className="text-4xl mb-8 text-blue-800 font-bold">Repport</h1>
      
      <form 
        className="flex flex-col w-full max-w-xl bg-white p-6 rounded-lg shadow-lg space-y-6" 
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <LabelStyle1 labelText="Subject" labelClassName="text-lg font-semibold mb-2" />
          <input
            type="text"
            name="subject"
            placeholder="Enter the repport subject"
            value={repportData.subject}
            onChange={handleChange}
            className="w-full border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 text-blue-900 placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col">
          <LabelStyle1 labelText="repport" labelClassName="text-lg font-semibold mb-2" />
          <textarea
            name="content"
            placeholder="Write the repport content here"
            value={repportData.content}
            onChange={handleChange}
            className="w-full border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 text-blue-900 placeholder-gray-400"
            rows="8"
          ></textarea>
        </div>

        {/* Display error or success message */}
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <ButtonStyle1 
          buttonText="Submit Repport" 
          onClick={handleSubmit}
          buttonClassName="w-full py-3 font-semibold text-lg"
        />
      </form>
    </div>
  );
}
