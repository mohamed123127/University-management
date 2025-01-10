import React, { useState } from "react";
import LabelStyle1 from "components/custom controls/labels/LabelStyle1";
import ButtonStyle1 from "components/custom controls/buttons/ButtonStyle1";
import { useTranslation } from 'react-i18next';
import ComboBoxStyle1 from "components/custom controls/combo box/ComboBoxStyle1";
import AnnouncementJs from "js/models/Announcement";

export default function Announcement() {
    const [recipient,setRecipient] = useState("");
  const [announcementData, setAnnouncementData] = useState({
    title: '',
    content: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  
    // Input validation
    if (!recipient && !announcementData.title && !announcementData.content) {
      setError("All fields (recipient, Title, and Content) are required.");
      setSuccessMessage("");
      return;
    }
  
    

    try {
      const result = await AnnouncementJs.Add({"title":announcementData.title,"content":announcementData.content,"recipient":recipient});
  
      if (result.success) {
        setError('');
        setSuccessMessage("Announcement sent successfully.");
        setAnnouncementData({ title: '', content: '' }); // Reset fields after submission
        setRecipient('');
      } else {
        setSuccessMessage('');
        setError(result.message || "An error occurred while sending the announcement.");
      }
    } catch (error) {
      alert("catch in button handled : \n" + error)
    }
  };
  
  const { t, i18n } = useTranslation();
  const options = [
    "All",
    "Licence 1",
    "Licence 2",
    "Licence 3",
    "Master 1",
    "Master 2",
  ];

  const ComboBoxhandleChange = (e) => {
    const { value } = e.target;
    setRecipient(value);
};
  return (
    <div className="flex flex-col items-center w-full h-full p-8">      
      <form 
        className="flex flex-col w-full max-w-xl bg-white p-6 rounded-lg shadow-lg h-full" 
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col ">
          <LabelStyle1 labelText={t('recipient')} labelClassName="text-lg font-semibold" />
          <ComboBoxStyle1 options={options} value={recipient} onChange={ComboBoxhandleChange} comboBoxClassName={"w-full rounded-lg border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 py-3"}/>
        </div>

        <div className="flex flex-col">
          <LabelStyle1 labelText={t('Title')} labelClassName="text-lg font-semibold mb-2" />
          <input
            type="text"
            name="title"
            placeholder={t('AnnouncmentPlaceholderTitle')}
            value={announcementData.title}
            onChange={handleChange}
            className="w-full border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 text-blue-900 placeholder-gray-400 mb-2"
          />
        </div>

        <div className="flex flex-col h-full">
          <LabelStyle1 labelText={t('Content')} labelClassName="text-lg font-semibold mb-2" />
          <textarea
            name="content"
            placeholder={t('AnnouncmentPlaceholderContent')}
            value={announcementData.content}
            onChange={handleChange}
            className="w-full h-full border resize-none border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 text-blue-900 placeholder-gray-400 mb-4"
          ></textarea>
        </div>

        {/* Display error or success message */}
        {error && <p className="text-red-500 mt-2 mb-2">{error}</p>}
        {successMessage && <p className="text-green-500 mt-2 mb-2">{successMessage}</p>}

        <ButtonStyle1 
          buttonText= {t('SendAnnouncement')} 
          onClick={handleSubmit}
          buttonClassName="w-full py-2 font-semibold text-lg"
        />
      </form>
    </div>
  );
}
