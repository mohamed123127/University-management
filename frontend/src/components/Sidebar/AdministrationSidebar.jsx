import React, { useState } from "react";
import Dropdown from "components/custom controls/buttons/Dropdown";
import SideBatItem from "components/Sidebar/SideBarItem";
import { DocumentIcon , UserGroupIcon  , EyeIcon , ExclamationCircleIcon , BellIcon   , UserCircleIcon  } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import Administration from "pages/AdministrationSide/Administration";
import DocumentRequestsAdmin from "pages/AdministrationSide/DocumentRequestsAdmin";
import Problems from "pages/AdministrationSide/ReportProblem";
import Students from "pages/AdministrationSide/Students";
import VisualRequestsAdmin from "pages/AdministrationSide/VisualRequestsAdmin";
import Announcement from "pages/AdministrationSide/Announcements";

export default function EtudientSideBar({ClassName,SetActualPageName,SetActualPageIcon,SetActualPage,isOpen,setIsOpen}) {
  const [openedList, setOpenedList] = useState(""); // القائمة الفرعية المفتوحة
  const { t, i18n } = useTranslation();

  const toggleStatSidebar = () => {
    if (isOpen) {
      setOpenedList("");
    }
    setIsOpen(!isOpen);
  };

  const sidebarItemClickHundled = (PageName, PageIcon, Page) => {
    SetActualPageName(PageName);
    SetActualPageIcon(PageIcon);
    SetActualPage(Page);
  }

  return (
    <div className={`${ClassName}`}>
      <div className={`relative flex flex-col h-screen ${isOpen ? "w-60" : "w-12"} bg-blue-600 p-1 text-white transition-all duration-500 ease-in-out`}>
        {/* زر الشريط الجانبي */}
        <Dropdown isOpen={isOpen} setIsOpen={toggleStatSidebar} Orientation={"horizontal"} ClassName="mt-3 ltr:ml-2 rtl:mr-2"/>

        <div className="flex flex-col space-y-4 mt-20 h-full relative">
          <SideBatItem 
            OnClick={() => sidebarItemClickHundled('students', <UserGroupIcon  className="w-8 h-8" />, <Students />)} 
            itemIcon={<UserGroupIcon  size='25'/>} 
            Title={t('students')} 
            isOpen={isOpen} 
          />
          <SideBatItem 
            OnClick={() => sidebarItemClickHundled('document_requests_administration', <DocumentIcon className="w-8 h-8" />, <DocumentRequestsAdmin />)} 
            itemIcon={<DocumentIcon />} 
            Title={t('document_requests_administration')} 
            isOpen={isOpen}
          />
          <SideBatItem 
            OnClick={() => sidebarItemClickHundled('visual_requests', <EyeIcon className="w-8 h-8" />, <VisualRequestsAdmin />)} 
            itemIcon={<EyeIcon />} 
            Title={t('visual_requests')} 
            isOpen={isOpen}
          />
          <SideBatItem 
            OnClick={() => sidebarItemClickHundled('announcements', <BellIcon className="w-8 h-8" />, <Announcement />)} 
            itemIcon={<BellIcon />} 
            Title={t('announcements')} 
            isOpen={isOpen}
          />
          <SideBatItem 
            OnClick={() => sidebarItemClickHundled('Problems', <ExclamationCircleIcon className="w-8 h-8" />, <Problems />)} 
            itemIcon={<ExclamationCircleIcon />} 
            Title={t('Problems')} 
            isOpen={isOpen}
          />
          <SideBatItem 
            OnClick={() => sidebarItemClickHundled('Administration', <UserCircleIcon className="w-8 h-8" />, <Administration />)} 
            itemIcon={<UserCircleIcon />} 
            Title={t('Administration')} 
            isOpen={isOpen}
          />
          

          <h1 className={`text-xl font-bold absolute bottom-4 left-1/2 transform -translate-x-1/2 ${isOpen ? '' : 'hidden'}`}>{new Date().toLocaleDateString('en-GB').toString("d")}</h1>
        </div>
      </div>
    </div>
  );
}
