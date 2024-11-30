import React, { useState } from "react";
import LabelStyle1 from "components/custom controls/labels/LabelStyle1";
import ButtonStyle1 from "components/custom controls/buttons/ButtonStyle1";
import { useTranslation } from "react-i18next";
import ReportProblem from "js/models/ReportProblem";


export default function Repport({Email}) {
    const [t] = useTranslation();
  const [repportData, setRepportData] = useState({
    title: '',
    content: '',
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
  
    // Input validation
    if (!repportData.title && !repportData.content ) {
      setError("All fields ( Subject, and Content) are required.");
      return;
    }
  
    try{
        const result = await ReportProblem.Add({"title":repportData.title,"content":repportData.content,"email":Email});
        if (result.success === true) {
        setSuccessMessage("Repport sent successfully.");
        setRepportData({ title: '', content: '' });
    } else {
        setError(result.message);
    }
}catch(error)
{
    alert("catch in LoginButtonHandled:" + error);
    console.log(error);
}
    
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-2 bg-blue">    
      <form 
        className="flex flex-col w-full max-w-xl bg-white p-6 rounded-lg shadow-lg space-y-6 h-full" 
        onSubmit={handleSubmit}
      >
            <h2 className="text-blue-800 text-center text-2xl font-bold">{t('report_problem')}</h2>  
        <div className="flex flex-col">
          <LabelStyle1 labelText={t('Title')} labelClassName="text-lg font-semibold mb-2 rtl:mr-1 ltr:ml-1" />
          <input
            type="text"
            name="title"
            placeholder={t('reportPlaceholderTitle')}
            value={repportData.title}
            onChange={handleChange}
            className="w-full border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 text-blue-900 placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col h-full">
          <LabelStyle1 labelText={t('Content')} labelClassName="text-lg font-semibold mb-2 mb-2 rtl:mr-1 ltr:ml-1" />
          <textarea name="content" placeholder={t('reportPlaceholderContent')} value={repportData.content} onChange={handleChange} className="w-full h-full border resize-none border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 text-blue-900 placeholder-gray-400" />
        </div>

        {/* Display error or success message */}
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <ButtonStyle1 
          buttonText={t('SendReport')} 
          onClick={handleSubmit}
          buttonClassName="w-full py-3 font-semibold text-lg"
        />
      </form>
    </div>
  );
}
