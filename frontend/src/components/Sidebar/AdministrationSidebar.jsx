import React, { useState } from "react";
import Dropdown from "components/custom controls/buttons/Dropdown";
import SideBatItemWithList from "components/Sidebar/SideBarItemWithList";
import SideBatItem from "components/Sidebar/SideBarItem";
import { DocumentIcon , PlusCircleIcon , EyeIcon , ExclamationCircleIcon , BellIcon , Cog8ToothIcon  , UserCircleIcon  } from "@heroicons/react/24/solid";
import { RxDashboard } from "react-icons/rx";
import Announcements from "pages/Announcements";
import DocumentRequests from "pages/DocumentRequests";
import ManageAccount from "pages/ManageAccount";
import ReportProblem from "pages/ReportProblem";
import Settings from "pages/Settings";
import VisualRequests from "pages/VisualRequests";
import EtudientDashboard from "pages/EtudientDashboard";
import { useTranslation } from "react-i18next";

export default function EtudientSideBar({ClassName,SetActualPageName,SetActualPageIcon,SetActualPage,isOpen,setIsOpen}) {
  const [openedList, setOpenedList] = useState(""); // القائمة الفرعية المفتوحة
  const { t, i18n } = useTranslation();

  const DocumentRequestItemsList = [
    t('registration_certificate'),
    t('transcript_request'),
    t('parking_permit'),
    t('library_card'),
    t('internship_permit'),
    t('student_id_card'),
    t('block_academic_year'),
  ];

  const VisualRequestsItemsList = [
    t('group_change_request'),
    t('specialty_change_request'),
    t('club_creation_request')
  ];

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

  const DocumentRequestListItemClickHundled = (Page) => {
    SetActualPageName('document_requests');
    SetActualPageIcon(<DocumentIcon className="w-8 h-8" />);
    SetActualPage(Page);
    setOpenedList('');
  }

  return (
    <div className={`${ClassName}`}>
      <div className={`relative flex flex-col h-screen ${isOpen ? "w-60" : "w-12"} bg-blue-600 p-1 text-white transition-all duration-500 ease-in-out`}>
        {/* زر الشريط الجانبي */}
        <Dropdown isOpen={isOpen} setIsOpen={toggleStatSidebar} Orientation={"horizontal"} ClassName="mt-3 ltr:ml-2 rtl:mr-2"/>

        <div className="flex flex-col space-y-4 mt-20 h-full relative">
          <SideBatItem 
            OnClick={() => sidebarItemClickHundled('students', <RxDashboard className="w-8 h-8" />, <EtudientDashboard />)} 
            itemIcon={<RxDashboard size='25'/>} 
            Title={t('students')} 
            isOpen={isOpen} 
          />
          <SideBatItem 
            OnClick={() => sidebarItemClickHundled('report_problem', <ExclamationCircleIcon className="w-8 h-8" />, <ReportProblem />)} 
            itemIcon={<ExclamationCircleIcon />} 
            Title={t('report_problem')} 
            isOpen={isOpen}
          />
          <SideBatItem 
            OnClick={() => sidebarItemClickHundled('manage_account', <UserCircleIcon className="w-8 h-8" />, <ManageAccount />)} 
            itemIcon={<UserCircleIcon />} 
            Title={t('manage_account')} 
            isOpen={isOpen}
          />
          

          <h1 className={`text-xl font-bold absolute bottom-4 left-1/2 transform -translate-x-1/2 ${isOpen ? '' : 'hidden'}`}>{new Date().toLocaleDateString('en-GB').toString("d")}</h1>
        </div>
      </div>
    </div>
  );
}