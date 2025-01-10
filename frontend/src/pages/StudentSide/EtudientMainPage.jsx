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
    const [isOpenedSidebar,setIsOpenedSidebar] = useState(true);
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
        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] h-screen">
            <Header ClassName="col-start-2 row-start-1 justify-self-end" StudentName={studentData ? studentData.LastName + " " + studentData.FirstName : ''} PageIcon={actualPageIcon} PageName={actualPageName} studentId={localStorage.getItem('id')}/>
            <div className={`col-start-1 row-start-1 row-span-2 ${isOpenedSidebar ? 'w-60' : 'w-12'} `}>
            <SideBar ClassName='fixed top-0 ltr:left-0 rtl:right-0' SetActualPageName={setActualPageName} SetActualPageIcon={setActualPageIcon} SetActualPage={setActualPage} isOpen={isOpenedSidebar} setIsOpen={setIsOpenedSidebar} studentData={studentData}/>
            </div>
            <div className="bg-gray-100 w-full h-full col-start-2 row-start-2">
                {actualPage}
            </div>
        </div>
    );
}