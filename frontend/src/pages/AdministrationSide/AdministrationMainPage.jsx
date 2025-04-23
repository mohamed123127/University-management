import React, { useEffect, useState } from "react";
import Header from "components/Header/AdministrationHeader";
import SideBar from "components/Sidebar/AdministrationSidebar";
import Students from "./Students";
import Administration from "js/models/Administration";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { FaUser } from "react-icons/fa";
import { use } from "i18next";



export default function MainPage({openedPage}){
    const [actualPageName,setActualPageName] = useState('students');
    const [actualPageIcon,setActualPageIcon] = useState(<UserGroupIcon className="w-8 h-8"/>);
    const [isOpenedSidebar,setIsOpenedSidebar] = useState(false);
    const [actualPage,setActualPage] = useState(<Students/>);
    const [adminData, setAdminData] = useState(null);
    const [isGeneraleAdmin,setIsGeneraleAdmin] = useState(localStorage.getItem('id')==='1' ? true : false );

    useEffect(() => {
        const fetchadminData = async () => {
            try {
                const data = await Administration.GetById(localStorage.getItem('id')); // جلب البيانات
                setAdminData(data); // تحديث الحالة
            } catch (error) {
                alert("catch in Document Request" + error);
            }
        };

         fetchadminData(); // استدعاء الدالة
    }, []);

    return(
        
        <div>
            <div className={`fixed md:static w-screen h-12 pr-0 pl-0 ${isOpenedSidebar ? "hidden md:block md:rtl:pr-60 md:ltr:pl-60" : "md:rtl:pr-16 md:ltr:pl-16"} bg-green-300`}>
            <Header AdminName={adminData ? adminData.LastName + " " + adminData.FirstName : ''} PageIcon={actualPageIcon} PageName={actualPageName} isOpenedSidebar={isOpenedSidebar} setIsOpenedSidebar={setIsOpenedSidebar}/>
            </div>
            <div className={`flex w-full h-full ${isOpenedSidebar ? "pt-0" : "pt-12"} md:pt-0`}>
                <div className={`${isOpenedSidebar ? "w-full md:w-60" : "hidden md:block md:w-16"} static md:fixed md:top-0 h-full bg-blue-400`}>
                <SideBar SetActualPageName={setActualPageName} SetActualPageIcon={setActualPageIcon} SetActualPage={setActualPage} isOpen={isOpenedSidebar} setIsOpen={setIsOpenedSidebar} isGeneraleAdmin={isGeneraleAdmin}/>
                </div>
                    <div className={`${isOpenedSidebar ? "hidden md:block md:rtl:pr-60 md:ltr:pl-60" : "block md:rtl:pr-16 md:ltr:pl-16"} w-full pl-0 pr-0`}>
                    {actualPage}
                    </div>
            </div>
        </div>

/*<div className="grid grid-cols-[1fr] grid-rows-[auto_1fr] h-screen bg-slate-400">
            <Header ClassName="sticky top-0 left-0 row-start-1 h-16 w-screen"  style={{ transform: "translateX(var(--scroll-x, 0px))" }} AdminName={adminData ? adminData.LastName + " " + adminData.FirstName : ''} PageIcon={actualPageIcon} PageName={actualPageName} isOpenedSidebar={isOpenedSidebar} setIsOpenedSidebar={setIsOpenedSidebar}/>
            <div className="row-start-2 flex bg-yellow-400">
                <div id="sidebar" className={`${isOpenedSidebar ? "w-full md:w-60" : "hidden md:block md:w-16"} h-full transition-all`} >
                    <SideBar ClassName={`top-0 ltr:left-0 rtl:right-0`} SetActualPageName={setActualPageName} SetActualPageIcon={setActualPageIcon} SetActualPage={setActualPage} isOpen={isOpenedSidebar} setIsOpen={setIsOpenedSidebar} isGeneraleAdmin={isGeneraleAdmin}/>
                </div>
                <div className={`bg-gray-100 w-full h-full col-start-2 row-start-2 ${isOpenedSidebar ? "hidden md:block" : "block"}`} onScroll={(e) => {
        document.documentElement.style.setProperty('--scroll-x', `-${e.currentTarget.scrollLeft}px`);
    }}>
                        {actualPage}
                </div>            
            </div>
        </div>*/

        /*<div className="bg-gray-400">
            <div className="fixed md:static w-full h-12 pl-0 md:pl-16 bg-green-300">header</div>
            <div className="flex w-full h-full pt-12 md:pt-0 bg-yellow-200">
                <div className="static md:fixed md:top-0 flex flex-col justify-between h-full w-16 bg-blue-400">
                    <div className="h-4 w-full bg-red-400"/>
                    <div className="h-4 w-full bg-red-400"/>
                </div>
                    <div className="w-full pl-0 md:pl-16 h-[1000px] bg-purple-400">
                       body
                    </div>
            </div>
        </div>*/
    );
}