import React, { useState } from "react";
import Dropdown from "components/custom controls/buttons/Dropdown";
import SideBatItemWithList from "components/Sidebar/SideBarItemWithList";
import SideBatItem from "components/Sidebar/SideBarItem";
import { DocumentIcon , PlusCircleIcon , EyeIcon , ExclamationCircleIcon , BellIcon , DocumentTextIcon, UserCircleIcon  } from "@heroicons/react/24/solid";


export default function SideBar({ClassName}) {
  const [isOpen, setIsOpen] = useState(true); // حالة الشريط الجانبي
  const [openedList, setOpenedList] = useState(""); // القائمة الفرعية المفتوحة
  const DocumentRequestItemsList = [
    "Certificate Of Enrollment",
    "Transcript Request",
    "Parking Permit",
    "Library Card",
    "Internship Permit",
    "Student ID Card",
    "Block Academic Year",
  ];
  const VisualRequestsItemsList = [
    "Group Change Request",
    "Specialty Change Request",
    "Club Creation Request"
  ]
  const AdditionalRequestsItemsList = [
    "Scholarship Request",
    "Study Abroad Scholarship Request"
  ];
  const toggleStatSidebar = () => {
    if (isOpen) {
      setOpenedList("");
    }
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`relative flex flex-col h-screen ${
        isOpen ? "w-60" : "w-12"
      } bg-blue-600 p-1 text-white transition-all duration-500 ease-in-out ${ClassName}`}
    >
      {/* زر الشريط الجانبي */}
      <Dropdown isOpen={isOpen} setIsOpen={toggleStatSidebar} Orientation={"horizontal"} ClassName="mt-3 ml-2"/>

      <div className="flex flex-col space-y-4 mt-12 h-full relative">
        <SideBatItemWithList itemIcon={DocumentIcon} Title="Document requests" isOpen={isOpen} ItemsList={DocumentRequestItemsList} OpenedList={openedList} setOpenedList={setOpenedList}/>
        <SideBatItemWithList itemIcon={EyeIcon} Title="Visual requests" isOpen={isOpen} ItemsList={VisualRequestsItemsList} OpenedList={openedList} setOpenedList={setOpenedList}/>
        <SideBatItemWithList itemIcon={PlusCircleIcon} Title="Additional requests" isOpen={isOpen} ItemsList={AdditionalRequestsItemsList} OpenedList={openedList} setOpenedList={setOpenedList}/>
        <SideBatItem itemIcon={DocumentTextIcon} Title="View demand processing" isOpen={isOpen}/>
        <SideBatItem itemIcon={UserCircleIcon} Title="Manage Account" isOpen={isOpen}/>
        <SideBatItem itemIcon={DocumentTextIcon} Title="Detailed requests display" isOpen={isOpen}/>
        <SideBatItem itemIcon={ExclamationCircleIcon} Title="Report problem" isOpen={isOpen}/>
        <SideBatItem itemIcon={BellIcon} Title="Announcements" isOpen={isOpen}/>
        <h1 className={`text-xl font-bold absolute bottom-4 left-1/2 transform -translate-x-1/2 ${isOpen ? '' : 'hidden'}`}>{new Date().toLocaleDateString('en-GB').toString("d")}</h1>
      </div>
    </div>
  );
}
