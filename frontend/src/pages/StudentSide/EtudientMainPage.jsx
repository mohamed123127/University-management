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
        <div>
                    <div className={`fixed md:static w-screen h-12 ltr:pr-0 rtl:pl-0 ${isOpenedSidebar ? "hidden md:block md:rtl:pr-60 md:ltr:pl-60" : "md:rtl:pr-16 md:ltr:pl-16"} bg-green-300`} >
                    <Header StudentName={studentData ? studentData.LastName + " " + studentData.FirstName : ''} PageIcon={actualPageIcon} PageName={actualPageName} studentId={localStorage.getItem('id')} isOpenedSidebar={isOpenedSidebar} setIsOpenedSidebar={setIsOpenedSidebar} />            
                    </div>
                    <div className={`flex w-full h-full ${isOpenedSidebar ? "pt-0" : "pt-12"} md:pt-0`}>
                        <div className={`${isOpenedSidebar ? "w-full md:w-60" : "hidden md:block md:w-16"} static md:fixed md:top-0 h-full bg-blue-400`}>
                        <SideBar SetActualPageName={setActualPageName} SetActualPageIcon={setActualPageIcon} SetActualPage={setActualPage} isOpen={isOpenedSidebar} setIsOpen={setIsOpenedSidebar} studentData={studentData}/>
                        </div>
                            <div className={`${isOpenedSidebar ? "hidden md:block md:rtl:pr-60 md:ltr:pl-60" : "block md:rtl:pr-16 md:ltr:pl-16"} h-full w-full pr-0 pl-0`}>
                            {actualPage}
                            </div>
                    </div>
        </div>
    );
}