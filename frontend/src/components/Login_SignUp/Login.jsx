import React, { useState , useEffect,useRef} from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ToggleButton from "../custom controls/ToggleButton"
import LabelStyle1 from "../custom controls/labels/LabelStyle1"
import TextBoxStyle2 from "../custom controls/textBox/TextBoxStyle2";
import ButtonStyle1 from "../custom controls/buttons/ButtonStyle1"
import GoogleIcon from "resources/Icons/GoogleIcon.png"
import Language from "components/Basics/Language";
import Student from "js/models/Student";
import Administration from "js/models/Administration";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import Swal from 'sweetalert2';


export default function Login({SignUpButtonHandled,ClassName}){
    const { t, i18n } = useTranslation();

    const [currentLanguage, setCurrentLanguage] = useState("");
    const SignUpButton = useRef(null);
    useEffect(()=>{
        i18n.changeLanguage(currentLanguage);
    },[currentLanguage])

    const handleLanguageChange = (lang) => {
        setCurrentLanguage(lang);
    };
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const [isStudent,setIsStudent] = useState(true);
    const [loginFormData,setLoginFormData] = useState({
        email:'',
        password:''
    });

    const LoginButtonHandled = async(e)=> {
        e.preventDefault();
        try{
            let data ;
            if(isStudent) data = await Student.isExistEtudient(loginFormData.email,loginFormData.password);
            else data = {success:true,token:'asd123',id:1} //await Administration.isExistEtudient(loginFormData.email,loginFormData.password);
        if (data.success === true) {
            localStorage.setItem('jwt', data.token); // تخزين التوكن في Local Storage
            localStorage.setItem('id',data.id)
            // يمكنك توجيه المستخدم إلى صفحة أخرى هنا
            isStudent ? navigate("/EtudientMainPage") : navigate("/AdministrationMainPage");
        } else {
            alert(data.message);
        }
    }catch(error)
    {
        alert("catch in LoginButtonHandled:" + error);
    }
    }

    const LoginWithGoogleButtonHandled = (e)=>{
        e.preventDefault();
        window.location.href = 'http://localhost/University-management/backend/roots/LoginWithGoogle.php';
    }

    useEffect(() => {
        async function Connect() {
            const params = new URLSearchParams(window.location.search);
        const email = params.get('email');

        if (email) {
                const result = await Student.GetByEmail(email);
                if(result.success){
                    if(result.isRegistered){
                        const data = result.Data;
                        localStorage.setItem('id',data.Id)
                        navigate("/EtudientMainPage");
                    }else{
                        Swal.fire({
                            title: 'تنبيه!',
                            text: t('CompleteYourDataToLoginMessage'),
                            icon: 'info', // أنواع الأيقونات: success, error, warning, info, question
                            confirmButtonText: 'حسناً',
                            confirmButtonColor: '#3085d6',
                            background: '#f7f7f7',
                            customClass: {
                              popup: 'my-custom-alert'
                            }
                          });
                        SignUpButton.current.click();
                    }
                }else{

                    console.log(result.success + " / " + result.message);
                }
        }
        }
        Connect();
    }, []);
    return(
        <div className={`${ClassName} flex flex-col items-center relative`}>
            <div className="flex flex-col items-center relative h-full w-full">
                    {/* Student_adminstation switch and welcom part */}
                        <div className="flex justify-end w-full pb-20 ">
                            <LabelStyle1 labelText={t('Login')} labelClassName="absolute left-1/2 transform -translate-x-1/2 text-3xl text-blue-600 mt-10 text-nowrap"/>
                            <Language ClassName="mt-2 mr-2 rtl:ml-2" onLanguageChange={handleLanguageChange} DefaultLanguage={i18n.language}/>
                        </div>
                    {/* Login_SignUp form */}
                    <form className="bg-white flex flex-col w-[80%]">
                    <LabelStyle1 labelText={`${t('Email')}:`} labelClassName="text-md"/>
                    <TextBoxStyle2 Name='email' placeholder="Example@gmail.com" value={loginFormData.email} onChange={handleChange} textBoxClassName="w-full pr-1"/>
                    <LabelStyle1 labelText={`${t('Password')}:`} labelClassName="text-md mt-5"/>
                    <TextBoxStyle2 Name='password' placeholder="password" value={loginFormData.password} onChange={handleChange} textBoxClassName="w-full pr-1"/>
                    <a href="#" className="self-end text-sm text-blue-400 max-w-fit">{`${t('ForgotPassword')}`}</a>
                    <ButtonStyle1 buttonText={`${t('Login')}`} buttonClassName="mt-5" onClick={LoginButtonHandled}/>
                    <div className="relative mt-8">
                        <h5 className="absolute left-1/2 transform -translate-x-1/2 top-[-12px] bg-white px-2">{`${t('OR')}`}</h5>
                        <hr className="border border-gray-500" />
                    </div>
                    <button disabled={!isStudent} onClick={LoginWithGoogleButtonHandled} className={`text-gray-500 rounded-[5px] p-2 text-[12px] font-Cairo bg-white shadow-md mt-5 disabled:bg-gray-400 disabled:cursor-not-allowed`}>
                        <div className="flex justify-center">
                            <img src={GoogleIcon} alt="Button Icon" className="w-4 h-4 mr-2 rtl:ml-2 mt-[1px]"/>
                            {`${t('SignWithGoogle')}`}
                        </div>
                    </button>
                    </form>
                    <p className={`text-gray-400 text-xs mr-auto rtl:ml-auto rtl:mr-11  ltr:ml-11 mt-3 ${isStudent ? 'visible' : 'hidden'}`}>{`${t('DontHaveAccount')}`} <button ref={SignUpButton} onClick={SignUpButtonHandled} className="text-blue-400">{`${t('SignUp')}`}</button></p>

                    <ToggleButton toggleButtonClassName="absolute bottom-4" leftLabel={`${t('Administration')}`} rightLabel={`${t('Student')}`} onToggle={setIsStudent}/>
            </div>
        </div>
    );
}