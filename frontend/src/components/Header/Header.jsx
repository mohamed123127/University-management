import React, { useState } from "react";
import Notification from "./Notification";
import Account from "./Account";
import { FaUser } from "react-icons/fa";

export default function Header({ActualPageName,ActualPageIcon,ClassName}){
    const [notifications,setNotifications] = useState([
        {
            id: 1, // Unique identifier for the notification
            message: "Your account has been activated",
            date_time: '04/11/2024 16:32', // Time when the notification was created
            read: true, // Status to determine if the notification is read
        },
        {
            id: 2, // Unique identifier for the notification
            message: "Your demand to change group was accepted",
            date_time: '06/11/2024 09:20', // Time when the notification was created
            read: false, // Status to determine if the notification is read
        },
        {
            id: 3, // Unique identifier for the notification
            message: "Your student card has been finished",
            date_time: '07/11/2024 11:58', // Time when the notification was created
            read: false, // Status to determine if the notification is read
        }]);
        const [openedPanel,setOpenedPanel] = useState('');
        const handleOpenPanelClick = (listName) => {
            setOpenedPanel((prevList) => (prevList === listName ? "" : listName));
          };
    return(
        <div className={`flex justify-between bg-blue-600 shadow-md w-full h-12 ${ClassName}`}>
            <div className="flex items-center text-white">
                <ActualPageIcon size="30" className="ml-2"/>
                <h2 className="ml-1 font-bold text-xl">{ActualPageName}</h2>
            </div>
            <div className="flex items-center">
                <Notification notificationsList={notifications} setNotification={setNotifications} isOpen={openedPanel === "Notifications"} setIsOpen={() => handleOpenPanelClick("Notifications")} ClassName="mr-2"/>
                <Account AccountImage={FaUser} AccountName="Mohamed Louahchi" isOpen={openedPanel === "Account"} setIsOpen={() => handleOpenPanelClick("Account")} ClassName="mr-4"/>
            </div>
        </div>
    );
}