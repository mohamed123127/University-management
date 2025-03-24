import React, { useState, useEffect } from "react"; 
import Notification from "./Notification"; 
import Account from "./Account"; 
import { FaUser } from "react-icons/fa"; 
import Language from "components/Basics/Language"; 
import { useTranslation } from "react-i18next";
import NotificationJs from "js/models/Notification";
import BurggerButton from "components/custom controls/buttons/BurggerButton";

export default function EtudientHeader({ ClassName, PageName, PageIcon,StudentName="",studentId='',isOpenedSidebar, setIsOpenedSidebar}) {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your account has been activated", date_time: "04/11/2024 16:32", IsRead: true },
    { id: 2, message: "Your demand to change group was accepted", date_time: "06/11/2024 09:20", IsRead: false },
    { id: 3, message: "Your student card has been finished", date_time: "07/11/2024 11:58", IsRead: false },
    { id: 4, message: "لقد تم تفعيل حسابك", date_time: "07/11/2024 11:58", IsRead: false },
    ]);

    useEffect(()=>{
      async function loadNotification() {
        const data = await NotificationJs.getByStudentId(studentId);
      //console.log(data);
      setNotifications(data);
      }
      loadNotification();
    },[])
  const [openedPanel, setOpenedPanel] = useState(""); const handleOpenPanelClick = (listName) => { setOpenedPanel((prevList) => (prevList === listName ? "" : listName)); };
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language); 
  const handleLanguageChange = (lang) => { setCurrentLanguage(lang); };

  useEffect(() => { i18n.changeLanguage(currentLanguage); document.documentElement.dir = i18n.dir(); }, [currentLanguage]);

  return (
    <div className={`flex justify-between bg-blue-600 shadow-md w-full h-12 ltr:pr-2 rtl:pl-2 ${isOpenedSidebar ? "hidden md:flex" : "flex"} ${ClassName}`}>
      <div className="flex items-center text-white">
        <div className="ltr:ml-4 rtl:mr-4">{PageIcon}</div>
        <h2 className="ltr:ml-1 rtl:mr-1 font-bold text-xl">{t(PageName)}</h2>
      </div>
      <div className="flex items-center">
        <Language onLanguageChange={handleLanguageChange} DefaultLanguage={i18n.language} ClassName="ltr:mr-2 rtl:ml-2" PrimaryButtonColor="red" />
        <Notification studentId={studentId} notificationsList={notifications} setNotification={setNotifications} isOpen={openedPanel === "Notifications"} setIsOpen={() => handleOpenPanelClick("Notifications")} ClassName="ltr:mr-2 rtl:ml-2" />
        <Account AccountImage={FaUser} AccountName={StudentName} isOpen={openedPanel === "Account"} setIsOpen={() => handleOpenPanelClick("Account")} ClassName="ltr:mr-2 rtl:ml-2" />
        <BurggerButton isOpen={isOpenedSidebar} setIsOpen={setIsOpenedSidebar}/>
      </div>
    </div>
  );
}
