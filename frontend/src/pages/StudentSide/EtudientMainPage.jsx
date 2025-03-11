import React, { useEffect, useState } from "react";
import Header from "components/Header/EtudientHeader";
import SideBar from "components/Sidebar/EtudientSideBar";
import EtudientDashboard from "./EtudientDashboard";
import { RxDashboard } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { use } from "i18next";
import Student from "js/models/Student";


export default function MainPage({openedPage}){
    const [actualPageName,setActualPageName] = useState('dashboard');
    const [actualPageIcon,setActualPageIcon] = useState(<RxDashboard className="w-8 h-8"/>);
    const [isOpenedSidebar,setIsOpenedSidebar] = useState(false);
    const [studentData, setStudentData] = useState(null);
    const [actualPage, setActualPage] = useState(null); // بدءًا بـ null

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const data = await Student.GetById(localStorage.getItem('id')); // جلب البيانات
                setStudentData(data.Data); // تحديث الحالة
            } catch (error) {
                alert("catch in Document Request" + error);
            }
        };

         fetchStudentData(); // استدعاء الدالة
    }, []); // التأثير يحدث مرة واحدة عند تحميل المكون

    // استخدام useEffect لتحديث actualPage بعد تحميل بيانات الطالب
    useEffect(() => {
        if (studentData) {
            setActualPage(<EtudientDashboard studentName={studentData.FirstName} />);
        }
    }, [studentData]); // تحديث actualPage عند تغيير studentData

    return(
        <div className="grid grid-cols-[1fr] grid-rows-[auto_1fr] h-screen bg-slate-400">
            <Header ClassName="justify-self-end row-start-1 h-16 w-full" StudentName={studentData ? studentData.LastName + " " + studentData.FirstName : ''} PageIcon={actualPageIcon} PageName={actualPageName} studentId={localStorage.getItem('id')} isOpenedSidebar={isOpenedSidebar} setIsOpenedSidebar={setIsOpenedSidebar} />            
            <div className="row-start-2 flex bg-yellow-400">
                <div id="sidebar" className={`${isOpenedSidebar ? "w-full md:w-60" : "hidden md:block md:w-16"} h-full transition-all`} >
                    <SideBar ClassName={`top-0 ltr:left-0 rtl:right-0`} SetActualPageName={setActualPageName} SetActualPageIcon={setActualPageIcon} SetActualPage={setActualPage} isOpen={isOpenedSidebar} setIsOpen={setIsOpenedSidebar} studentData={studentData}/>
                </div>
                <div className={`bg-gray-100 w-full h-full col-start-2 row-start-2 ${isOpenedSidebar ? "hidden md:block" : "block"}`}>
                {actualPage}
                </div>            
            </div>
        </div>
    );
}