import React, { useState, useEffect } from "react"; 
import Notification from "./Notification"; 
import Account from "./Account"; 
import { FaUser } from "react-icons/fa"; 
import Language from "components/Basics/Language"; 
import { useTranslation } from "react-i18next";

export default function Header({ ClassName, PageName, PageIcon }) {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your account has been activated", date_time: "04/11/2024 16:32", read: true },
    { id: 2, message: "Your demand to change group was accepted", date_time: "06/11/2024 09:20", read: false },
    { id: 3, message: "Your student card has been finished", date_time: "07/11/2024 11:58", read: false },
    { id: 4, message: "لقد تم تفعيل حسابك", date_time: "07/11/2024 11:58", read: false },
    ]);
  const [openedPanel, setOpenedPanel] = useState(""); const handleOpenPanelClick = (listName) => { setOpenedPanel((prevList) => (prevList === listName ? "" : listName)); };
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language); 
  const handleLanguageChange = (lang) => { setCurrentLanguage(lang); };

  useEffect(() => { i18n.changeLanguage(currentLanguage); document.documentElement.dir = i18n.dir(); }, [currentLanguage]);

  return (
    <div className={`flex justify-between bg-blue-600 shadow-md w-full h-12 ${ClassName}`}>
      <div className="flex items-center text-white">
        <div className="ltr:ml-4 rtl:mr-4">{PageIcon}</div>
        <h2 className="ltr:ml-1 rtl:mr-1 font-bold text-xl">{t(PageName)}</h2>
      </div>
      <div className="flex items-center">
        <Language onLanguageChange={handleLanguageChange} DefaultLanguage={i18n.language} ClassName="ltr:mr-2 rtl:ml-2" PrimaryButtonColor="red" />
        <Notification notificationsList={notifications} setNotification={setNotifications} isOpen={openedPanel === "Notifications"} setIsOpen={() => handleOpenPanelClick("Notifications")} ClassName="ltr:mr-2 rtl:ml-2" />
        <Account AccountImage={FaUser} AccountName="Mohamed Louahchi" isOpen={openedPanel === "Account"} setIsOpen={() => handleOpenPanelClick("Account")} ClassName="ltr:mr-4 rtl:ml-4" />
      </div>
    </div>
  );
}
