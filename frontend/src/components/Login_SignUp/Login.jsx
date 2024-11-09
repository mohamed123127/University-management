import React, { useState , useEffect} from "react";
import ToggleButton from "../custom controls/ToggleButton"
import LabelStyle1 from "../custom controls/labels/LabelStyle1"
import TextBoxStyle2 from "../custom controls/textBox/TextBoxStyle2";
import ButtonStyle1 from "../custom controls/buttons/ButtonStyle1"
import GoogleIcon from "resources/Icons/GoogleIcon.png"
import { useNavigate } from 'react-router-dom';

export default function Login({SignUpButtonHandled}){
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
            const response = await fetch('http://localhost/University-management/backend/roots/Login.php', { // تأكد من تغيير الرابط
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email:loginFormData.email, password:loginFormData.password })
            });
            if(response.ok){
                const data = await response.json();
                if (data.success === true) {
                    localStorage.setItem('jwt', data.token); // تخزين التوكن في Local Storage
                    alert('Login successful!');
                    // يمكنك توجيه المستخدم إلى صفحة أخرى هنا
                    navigate("/EtudientDashboard");
                } else {
                    alert('Login baad');
                }
            }else{
                alert('http dosent work');
            }
        } catch (err) {
            alert("cathch:    "+err);
        }
    }

    const LoginWithGoogleButtonHandled = (e)=>{
        e.preventDefault();
        window.location.href = 'http://localhost/University-management/backend/roots/LoginWithGoogle.php';
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const email = params.get('email');
        if (email) {
            // احفظ البريد الإلكتروني في الحالة أو قم بعملية تسجيل الدخول
            alert(`Logged in as: ${email}`);
            navigate("/EtudientDashboard");
        }
    }, []);
    return(
                <div className="flex flex-col">
                    {/* Student_adminstation switch and welcom part */}
                        <LabelStyle1 labelText="Login" labelClassName="mt-10 text-3xl justify-self-center text-blue-600 mb-10"/>
                    {/* Login_SignUp form */}
                    <form className="bg-white flex flex-col ml-10 w-[80%]">
                    <LabelStyle1 labelText="Email:" labelClassName="text-md"/>
                    <TextBoxStyle2 Name='email' placeholder="Example@gmail.com" value={loginFormData.email} onChange={handleChange} textBoxClassName="w-full"/>
                    <LabelStyle1 labelText="Password:" labelClassName="text-md mt-5"/>
                    <TextBoxStyle2 Name='password' placeholder="password" value={loginFormData.password} onChange={handleChange} textBoxClassName="w-full"/>
                    <a href="#" className="self-end text-sm text-blue-400 max-w-fit">Forgot password</a>
                    <ButtonStyle1 buttonText="Login" buttonClassName="mt-5" onClick={LoginButtonHandled}/>
                    <div className="relative mt-8">
                        <h5 className="absolute left-1/2 transform -translate-x-1/2 top-[-12px] bg-white px-2">OR</h5>
                        <hr className="border border-gray-500" />
                    </div>
                    <button onClick={LoginWithGoogleButtonHandled} className={`text-gray-500 rounded-[5px] p-2 text-[12px] font-Cairo bg-white shadow-md mt-5`}>
                        <div className="flex justify-center">
                            <img src={GoogleIcon} alt="Button Icon" className="w-4 h-4 mr-2 mt-[1px]"/>
                            Sing with Google
                        </div>
                    </button>
                    </form>
                    <p className={`text-gray-400 text-xs ml-10 mt-3 ${isStudent ? 'hidden' : 'visible'}`}>Dont have Account? <button onClick={SignUpButtonHandled} className="text-blue-400">Sing up</button></p>

                    <ToggleButton toggleButtonClassName="justify-center mt-auto mb-2" leftLabel="Administration" rightLabel="Student" onToggle={setIsStudent}/>
                </div>
    );
}