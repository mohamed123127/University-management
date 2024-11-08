import React, { useState , useEffect }  from "react";
import NotificationIcon from "resources/Icons/Notification.png";
import { IoNotifications } from "react-icons/io5";


export default function Notification({notificationsList,setNotification,ClassName}){
    const [isOpen,setIsOpen] = useState(false);
    const clickButtonHandled = ()=>{
         setIsOpen(!isOpen);
         setNotification((prevNotifications) =>
            prevNotifications.map((n) => ({ ...n, read: true }))
          );
        }
    const [notificationNumber,setNotificationNumber] = useState(5);
    useEffect(() => {
        setNotificationNumber(notificationsList.filter((n) => !n.read).length);
      }, [notificationsList]);
    return (
        <div className={`${ClassName}`}>
            <button onClick={clickButtonHandled} className="relative flex justify-end">
                <IoNotifications className="h-8 w-8 text-white" size="25"/>
                <div className={`absolute top-0 left-4 bg-red-600 w-4 h-4 rounded-full text-white flex items-center justify-center ${notificationNumber > 9 ? "text-[9px]" : "text-[11px]"}`}>
                    {notificationNumber > 9 ? "9+" : notificationNumber}
                </div>
                <div className={`absolute mt-9 flex flex-col items-center bg-white border border-gray-200 rounded-b-lg overflow-y-auto w-64 h-72 ${isOpen ? "transform scale-100 opacity-100 pointer-events-auto transition ease-out duration-200" : "transform scale-95 opacity-0 pointer-events-none transition ease-in duration-100"}}`}>
                
                {notificationsList.map((n) => (
                    <div
                      key={n.id}
                      className="flex flex-col items-start w-[95%] bg-white shadow-md border border-gray-200 my-1 p-2 rounded-lg hover:shadow-lg transition-shadow duration-300"
                    >
                      <h4 className="text-xs justify-self-start font-semibold text-blue-600">{n.message}</h4>
                      <p className="text-sm text-gray-500 mt-1 ml-auto">{n.date_time}</p>
                    </div>
                  ))}

                </div>
            </button>
        </div>
    );
}