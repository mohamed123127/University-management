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
import EmailServices from "js/models/EmailServices";
import Swal from 'sweetalert2';
import i18n from 'i18next';

export default function Login({SignUpButtonHandled,ClassName,currentLanguage,setCurrentLanguage}){
    const { t, i18n } = useTranslation();
    const SignUpButton = useRef(null);

    const ForgetPasswordButtonClick = async () => {
        // الخطوة 1: إدخال Matricule
        const { value: matricule } = await Swal.fire({
          title: "Restore Password",
          input: "text",
          inputLabel: "Enter your Matricule",
          inputPlaceholder: "e.g. 222234586466",
          showCancelButton: true,
          confirmButtonText: "Continue",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) return "You must enter your matricule!";
          }
        });
      
        if (!matricule) return;
      
        // استرجاع البريد بناءً على matricule 
        const result = await Student.GetByMatricule(matricule);
        if(!result.success){
             Swal.fire("Success!", "matricule dosent exsists", "error");
             return;
        }
        const studentData = result.Data;
        const email = studentData.Email;
        const maskedEmail = maskEmail(email);
      
        // الخطوة 2: تأكيد البريد
        let emailConfirmed = false;
        while (!emailConfirmed) {
          const { isCorrectEmail } = await Swal.fire({
            title: "Confirm your email",
            html: `
              <p>We found an email that looks like: <strong>${maskedEmail}</strong></p>
              <input type="email" id="email-confirm" class="swal2-input" placeholder="Enter full email">
              <div id="email-error" style="color:red; font-size:0.9em; min-height:1.2em;"></div>
            `,
            preConfirm: () => {
              const value = document.getElementById("email-confirm").value;
              if (!value) {
                Swal.getHtmlContainer().querySelector("#email-error").innerText = "Please enter your full email.";
                return false;
              }
              if (value !== email) {
                Swal.getHtmlContainer().querySelector("#email-error").innerText = "The email you entered is incorrect.";
                return false;
              }
              emailConfirmed = true;
              return true;
            },
            showCancelButton: true,
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel"
          });
        }
        await showVerificationPrompt(email);
      };
      
      // إخفاء جزء من البريد
      const maskEmail = (email) => {
        const [user, domain] = email.split("@");
        const visible = user.slice(0, 2);
        const masked = "*".repeat(user.length - 1);
        return `${visible}${masked}@${domain}`;
      };
      
      // إدخال كود من 6 خلايا + زر إعادة إرسال
      const generateConfirmCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
      };
      
      const showVerificationPrompt = async (email) => {
        let confirmCode = generateConfirmCode();
        EmailServices.sendEmail(
          email,
          "Code to restore password",
          `Here is the code to restore your password: ${confirmCode}. Please insert it in the form.`
        );
      
        while (true) {
          await Swal.fire({
            title: "Enter the verification code",
            html: `
              <p>We have sent a code to <strong>${email}</strong></p>
              <div id="code-inputs" style="display: flex; gap: 5px; justify-content: center; margin-top: 10px;">
                ${Array.from({ length: 6 }).map((_, i) => `
                  <input type="text" id="code-${i}" maxlength="1" 
                    class="bg-white border-slate-400 border-2 h-14 mr-2 w-10 text-center text-xl rounded-lg" />
                `).join('')}
              </div>
              <div id="error-msg" style="color: red; font-size: 0.9em; min-height: 1.2em; text-align:center;"></div>
              <button type="button" id="resend-code" class="bg-gray-500 w-fit h-fit p-4 text-white rounded-lg mt-2">
                Resend Code
              </button>
            `,
            didOpen: () => {
              const inputs = Array.from({ length: 6 }, (_, i) => document.getElementById(`code-${i}`));
              let timeoutId = null;
let hasSubmitted = false;

// نضيف طريقة للوصول لـ hasSubmitted من الخارج
window._setHasSubmitted = (val) => {
  hasSubmitted = val;
};

      
              const checkAutoSubmit = () => {
                if (hasSubmitted) return;
                const allFilled = inputs.every(input => input.value.length === 1);
                if (allFilled) {
                  clearTimeout(timeoutId);
                  timeoutId = setTimeout(() => {
                    hasSubmitted = true;
                    Swal.clickConfirm();
                  }, 1000);
                } else {
                  clearTimeout(timeoutId);
                }
              };
      
              inputs.forEach((input, index) => {
                input.addEventListener("input", (e) => {
                    const value = e.target.value;
                  
                    // إذا كان هناك خطأ سابق، نخفي رسالة الخطأ
                    if (window._codeInputHadError) {
                      const errorMsg = Swal.getHtmlContainer().querySelector("#error-msg");
                      if (errorMsg) errorMsg.innerText = "";
                      window._codeInputHadError = false;
                    }
                  
                    if (!/^\d$/.test(value)) {
                      e.target.value = "";
                      return;
                    }
                  
                    if (index < 5) inputs[index + 1].focus();
                    checkAutoSubmit();
                  });
                  
      
                input.addEventListener("keydown", (e) => {
                  if (e.key === "Backspace" && !input.value && index > 0) {
                    inputs[index - 1].focus();
                  }
                });
      
                input.addEventListener("paste", (e) => {
                  e.preventDefault();
                  const paste = e.clipboardData.getData("text").trim();
                  paste.split("").forEach((char, i) => {
                    if (inputs[i]) inputs[i].value = char;
                  });
                  if (inputs[5]) inputs[5].focus();
                  checkAutoSubmit();
                });
              });
      
              document.getElementById("resend-code").addEventListener("click", () => {
                confirmCode = generateConfirmCode();
                EmailServices.sendEmail(
                  email,
                  "Code to restore password",
                  `Here is your new code: ${confirmCode}. Please insert it in the form.`
                );
                Swal.getHtmlContainer().querySelector("#error-msg").innerText = "A new code has been sent!";
                console.log("Resending code to:", email);
              });
      
              const confirmButton = Swal.getConfirmButton();
              confirmButton.style.display = "none";
            },
            preConfirm: () => {
                let fullCode = "";
                for (let i = 0; i < 6; i++) {
                  fullCode += document.getElementById(`code-${i}`).value;
                }
              
                if (fullCode === confirmCode) {
                  console.log("Correct code entered:", fullCode);
                  return fullCode;
                } else {
                  const errorMsg = Swal.getHtmlContainer().querySelector("#error-msg");
                  errorMsg.innerText = "Incorrect code. Please try again or resend.";
              
                  // مسح الحقول
                  for (let i = 0; i < 6; i++) {
                    const input = document.getElementById(`code-${i}`);
                    if (input) input.value = "";
                  }
              
                  // تركيز المؤشر على أول خانة
                  document.getElementById("code-0")?.focus();
              
                  // تعيين الفلاغات لإعادة التحقق
                  window._codeInputHadError = true;
                  window._canAutoSubmitAgain = true;
              
                  // إعادة تفعيل التحقق
                  if (typeof window._setHasSubmitted === "function") {
                    window._setHasSubmitted(false);
                  }
              
                  console.log("Incorrect code:", fullCode, " / Expected:", confirmCode);
                  return false;
                }
              }
              
              
          })
        }
      };
      
      
    useEffect(()=>{
        i18n.changeLanguage(currentLanguage);
        const html = document.documentElement;
        html.setAttribute('lang', i18n.language);
        html.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
    },[currentLanguage])

    useEffect(()=>{
        setCurrentLanguage(i18n.language);
      },[i18n.language])

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
        matricule:'',
        password:''
    });

    const LoginButtonHandled = async(e)=> {
        e.preventDefault();
        try{
            let data ;
            if(isStudent) data = await Student.isExistEtudient(loginFormData.matricule,loginFormData.password);
          
            else data = await Administration.isExistAdmin(loginFormData.matricule,loginFormData.password); //await Administration.isExistEtudient(loginFormData.email,loginFormData.password);
         
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
                if(result.success)
                    {
                        if(result.isRegistered){
                            const data = result.Data;
                            if(data.Active){
                                localStorage.setItem('id',data.Id)
                                navigate("/EtudientMainPage");
                            }else{
                                alert("your account is not active")
                            }
                    }
                     else
                    {
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
                            <LabelStyle1 labelText={'Login'} labelClassName="absolute left-1/2 transform -translate-x-1/2 text-3xl text-blue-600 mt-10 text-nowrap"/>
                            <Language ClassName="mt-2 mr-2 rtl:ml-2" onLanguageChange={handleLanguageChange} DefaultLanguage={currentLanguage}/>
                        </div>
                    {/* Login_SignUp form */}
                    <div className="bg-white flex flex-col w-[80%]">
                    <LabelStyle1 labelText='Matricule' labelClassName="text-md"/>
                    <TextBoxStyle2 Name='matricule' placeholder="22227653984" value={loginFormData.matricule} onChange={handleChange} textBoxClassName="w-full pr-1"/>
                    <LabelStyle1 labelText='Password' labelClassName="text-md mt-5"/>
                    <TextBoxStyle2 type="password" Name='password' placeholder={`${'Password'}`} value={loginFormData.password} onChange={handleChange} textBoxClassName="w-full pr-1"/>
                    <button className="self-end text-sm text-blue-400 max-w-fit" onClick={()=>ForgetPasswordButtonClick()}>
                    {`${t('ForgotPassword')}`}
                    </button>
                    <ButtonStyle1 buttonText={`${'Login'}`} buttonClassName="mt-5" onClick={LoginButtonHandled}/>
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
                    </div>
                    <p className={`text-gray-400 text-xs mr-auto rtl:ml-auto rtl:mr-11  ltr:ml-11 mt-3 ${isStudent ? 'visible' : 'hidden'}`}>{`${t('DontHaveAccount')}`} <button ref={SignUpButton} disabled onClick={SignUpButtonHandled} className="text-blue-400 opacity-50 cursor-not-allowed">{`${t('SignUp')}`}</button></p>

                    <ToggleButton toggleButtonClassName="absolute bottom-4" leftLabel={`${'Administration'}`} rightLabel={`${'Student'}`} onToggle={setIsStudent}/>
            </div>
        </div>
    );
}
