import React, { useState, useEffect } from "react";
import Dropdown from "components/custom controls/buttons/Dropdown";
import SideBarItemWithList from "components/Sidebar/SideBarItemWithList";
import SideBatItem from "components/Sidebar/SideBarItem";
import { DocumentIcon , PlusCircleIcon , EyeIcon , ExclamationCircleIcon , BellIcon , Cog8ToothIcon  , UserCircleIcon  } from "@heroicons/react/24/solid";
import { RxDashboard } from "react-icons/rx";
import Announcements from "pages/AdministrationSide/Announcements";
import DocumentRequests from "pages/StudentSide/DocumentRequests";
import ManageAccount from "pages/StudentSide/ManageAccount";
import ReportProblem from "pages/StudentSide/ReportProblem";
import Settings from "pages/StudentSide/Settings";
import VisualRequests from "pages/StudentSide/VisualRequests";
import EtudientDashboard from "pages/StudentSide/EtudientDashboard";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

import JwtVerify from "js/models/Jwt";


export default function EtudientSideBar({ClassName,SetActualPageName,SetActualPageIcon,SetActualPage,isOpen,setIsOpen,studentData, studentRole}) {
  const [openedList, setOpenedList] = useState(""); // القائمة الفرعية المفتوحة
  const { t, i18n } = useTranslation();
const navigate = useNavigate();

  const DocumentRequestItemsList = [
    'registration_certificate',
        'grade_transcript',
        'parking_permit',
        'library_card',
        'internship_permit',
        'studentCard',
        'block_academic_year'
  ];

  const VisualRequestsItemsList = [
    'Group',
    'Section',
    'Speciality'
  ];

  const toggleStatSidebar = () => {
    if (isOpen) {
      setOpenedList("");
    }
    setIsOpen(!isOpen);
  };

 
 


  const verifyToken = async () => {
      const token = localStorage.getItem("jwt");
      console.log(token);
      if (!token) {
        console.log("❌ لا يوجد توكين في localStorage");
        navigate("/");
        return;
      }

      try {
        const isValid = await JwtVerify.JwtVerify(); // لازم الدالة ترجع true أو throw
        console.log("✅ النتيجة:", isValid);
        if (!isValid.success) {
            console.log("❌ nooo localStorage");
          localStorage.removeItem("jwt");
          navigate("/");
        }
      } catch (error) {
        localStorage.removeItem("jwt");
        navigate("/");
      }
    };
  const sidebarItemClickHundled = (PageName, PageIcon, Page) => {
    verifyToken();
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    SetActualPageName(PageName);
    SetActualPageIcon(PageIcon);
    SetActualPage(Page);
    if (mediaQuery.matches) {
      setIsOpen(!isOpen);
    }
  }

  const DocumentRequestListItemClickHundled = (Page) => {
    SetActualPageName('document_requests');
    SetActualPageIcon(<DocumentIcon className="w-8 h-8" />);
    SetActualPage(Page);
    setOpenedList('');
  }

  const VisualRequestsListItemClickHundled = (Page) => {
    SetActualPageName('visual_requests');
    SetActualPageIcon(<EyeIcon className="w-8 h-8" />);
    SetActualPage(Page);
    setOpenedList('');
  }

  return (
    <div className={`${ClassName}`}>
      <div className={`relative flex flex-col bg-blue-600 h-screen p-1 text-white transition-all duration-500 ease-in-out`}>
        {/* زر الشريط الجانبي */}
        <div className="flex justify-between">
          <Dropdown isOpen={isOpen} setIsOpen={toggleStatSidebar} Orientation={"horizontal"} ClassName={`mt-3 ltr:ml-2 rtl:mr-2 ${isOpen ? "collapse md:visible" : "visible"}`}/>
          <button onClick={()=>{setIsOpen(!isOpen)}} className={`mt-3 ltr:mr-2 rtl:ml-2 ${isOpen ? "block md:collapse" : "collapse"}`}>
              <X size={25} className="text-red-600"/>
          </button>
        </div>
        <div className={`flex flex-col ${isOpen ? "items-center md:items-start" : ""} space-y-4 mt-20 h-full relative`}>
       

         
          <SideBatItem 
            OnClick={() => sidebarItemClickHundled('dashboard', <RxDashboard className="w-8 h-8" />, <EtudientDashboard studentName={studentData.FirstName}/>)} 
            itemIcon={<RxDashboard size='25'/>} 
            Title={'dashboard'} 
            isOpen={isOpen} 
          />
          <SideBatItem 
            OnClick={() => sidebarItemClickHundled('document_requests', <DocumentIcon className="w-8 h-8" />, <DocumentRequests StudentData={studentData}/>)} 
            itemIcon={<DocumentIcon />} 
            Title={'document_requests'} 
            isOpen={isOpen} 
            StudentData={studentData}
          />
     <SideBatItem 
  OnClick={() => sidebarItemClickHundled('visual_requests', <EyeIcon className="w-8 h-8" />, <VisualRequests studentData={studentData}/>)} 
  itemIcon={<EyeIcon />} 
  Title={'visual_requests'} 
  isOpen={isOpen} 
  StudentData={studentData}
  ClassName={`${studentRole !== "Section Delegate" ? 'hidden':'visible' }`}
 />

<SideBatItem 
  OnClick={() => sidebarItemClickHundled('report_problem', <ExclamationCircleIcon className="w-8 h-8" />, <ReportProblem Email={studentData.Email} StudentId={studentData.Id}/>)} 
  itemIcon={<ExclamationCircleIcon />} 
  Title={'report_problem'} 
  isOpen={isOpen}
  ClassName={`${studentRole !== "Section Delegate" ? 'hidden':'visible' }`}
 />       
          <h1 className={`text-xl font-bold flex  absolute bottom-4 left-1/2 transform -translate-x-1/2 ${isOpen ? '' : 'hidden'}`}>{new Date().toLocaleDateString('en-GB').toString("d")}</h1>
        </div>
      </div>
    </div>
  );
}
