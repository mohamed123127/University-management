import React, { useEffect, useState } from "react";
import Header from "components/Header/EtudientHeader";
import SideBar from "components/Sidebar/EtudientSideBar";
import EtudientDashboard from "./EtudientDashboard";
import { RxDashboard } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { use } from "i18next";
import Student from "js/models/Student";
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';


export default function MainPage({openedPage}){
    const [actualPageName,setActualPageName] = useState('dashboard');
    const [actualPageIcon,setActualPageIcon] = useState(<RxDashboard className="w-8 h-8"/>);
    const [isOpenedSidebar,setIsOpenedSidebar] = useState(false);
    const [studentData, setStudentData] = useState(null);
    const [actualPage, setActualPage] = useState(null); // بدءًا بـ null
    const [role, setRole] = useState(null);
    const { t } = useTranslation();


    useEffect(() => {
        const fetchData = async () => {
            await fetchStudentData(); 
            fetchRole();
        };
   //      alert(localStorage.getItem("jwt"));
        fetchData();
    }, []);
    

    // استخدام useEffect لتحديث actualPage بعد تحميل بيانات الطالب
    useEffect(() => {
      //  alert(localStorage.getItem("jwt"));
        if (studentData) {
            setActualPage(<EtudientDashboard studentName={studentData.FirstName} />);
            checkIsFirstLogin();
        }
        
    }, [studentData]); // تحديث actualPage عند تغيير studentData
    const fetchStudentData = async () => {
        try {
            const data = await Student.GetById(localStorage.getItem('id')); // جلب البيانات
            setStudentData(data.Data); // تحديث الحالة
            //console.log(data);
        } catch (error) {
            alert("catch in Document Request" + error);
        }
    };
    
    const fetchRole = async () => {
        const nrole = await Student.getStudentWithRole(localStorage.getItem('id'));
        await setRole(nrole); 
        //console.log(role);
    };

      useEffect(() => {
    }, []);
     
    const checkIsFirstLogin = ()=>{
        if (studentData.isNew) {
            Swal.fire({
                title: t('changePassword'),
                html:
                    '<p>'+t('changePasswordOnFirstLoginForSecurityReason')+'</p>'+
                    '<input id="newPassword" type="password" class="!h-8 swal2-input" placeholder='+t('NewPassword')+'>' +
                    '<input id="confirmPassword" type="password" class="!h-8 swal2-input" placeholder='+t('ConfirmPassword')+'>',
                confirmButtonText: t('update'),
                confirmButtonColor: '#3B82F6',
                allowOutsideClick: false,
                allowEscapeKey: false,
                preConfirm: () => {
                    const newPassword = document.getElementById('newPassword').value;
                    const confirmPassword = document.getElementById('confirmPassword').value;
        
                    if (!newPassword || !confirmPassword) {
                        Swal.showValidationMessage(t('allFieldsRequired'));
                        return false;
                    }
        
                    if (newPassword !== confirmPassword) {
                        Swal.showValidationMessage(t('passwordsDoNotMatch'));
                        return false;
                    }
        
                    return { newPassword };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const newPassword = result.value.newPassword;
                    Student.firstLoginProcess(studentData.Id,newPassword);
                }
            });
        }
        
    }

    return(
        <div>
                    <div className={`fixed md:static w-screen h-12 ltr:pr-0 rtl:pl-0 ${isOpenedSidebar ? "hidden md:block md:rtl:pr-60 md:ltr:pl-60" : "md:rtl:pr-16 md:ltr:pl-16"} bg-green-300`} >
                    <Header StudentName={studentData ? studentData.LastName + " " + studentData.FirstName : ''} PageIcon={actualPageIcon} PageName={actualPageName} studentId={localStorage.getItem('id')} isOpenedSidebar={isOpenedSidebar} setIsOpenedSidebar={setIsOpenedSidebar} />            
                    </div>
                    <div className={`flex w-full h-full ${isOpenedSidebar ? "pt-0" : "pt-12"} md:pt-0`}>
                        <div className={`${isOpenedSidebar ? "w-full md:w-60" : "hidden md:block md:w-16"} static md:fixed md:top-0 h-full bg-blue-400`}>
                        <SideBar SetActualPageName={setActualPageName} SetActualPageIcon={setActualPageIcon} SetActualPage={setActualPage} isOpen={isOpenedSidebar} setIsOpen={setIsOpenedSidebar} studentData={studentData} studentRole={role}/>
                        </div>
                            <div className={`${isOpenedSidebar ? "hidden md:block md:rtl:pr-60 md:ltr:pl-60" : "block md:rtl:pr-16 md:ltr:pl-16"} h-full w-full pr-0 pl-0`}>
                            {actualPage}
                            </div>
                    </div>
        </div>
    );
}