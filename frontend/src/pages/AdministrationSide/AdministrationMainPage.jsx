import React, { useEffect, useState } from "react";
import Header from "components/Header/AdministrationHeader";
import SideBar from "components/Sidebar/AdministrationSidebar";
import Students from "./Students";
import { RxDashboard } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { use } from "i18next";



export default function MainPage({openedPage}){
    const [actualPageName,setActualPageName] = useState('students');
    const [actualPageIcon,setActualPageIcon] = useState(<RxDashboard className="w-8 h-8"/>);
    const [isOpenedSidebar,setIsOpenedSidebar] = useState(true);
    const [actualPage,setActualPage] = useState(<Students/>);
   
    return(
        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] h-screen">
            <Header ClassName="col-start-2 row-start-1 justify-self-end" PageIcon={actualPageIcon} PageName={actualPageName}/>
            <div className={`col-start-1 row-start-1 row-span-2 ${isOpenedSidebar ? 'w-60' : 'w-12'} `}>
            <SideBar ClassName='fixed top-0 ltr:left-0 rtl:right-0' SetActualPageName={setActualPageName} SetActualPageIcon={setActualPageIcon} SetActualPage={setActualPage} isOpen={isOpenedSidebar} setIsOpen={setIsOpenedSidebar}/>
            </div>
            <div className="bg-gray-100 w-full h-full col-start-2 row-start-2">
                {actualPage}
            </div>
        </div>
    );
}