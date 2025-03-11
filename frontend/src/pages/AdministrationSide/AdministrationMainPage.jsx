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
        <div className="grid grid-cols-[1fr] grid-rows-[auto_1fr] h-screen bg-slate-400">
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
        </div>
    );
}