import React, { useState } from "react";
import Login_SingUp_image from "../Images/Login_Singup_image.jpg"
import ToggleButton from "../components/custom controls/ToggleButton"
import LabelStyle1 from "../components/custom controls/labels/LabelStyle1"
import TextBoxStyle2 from "../components/custom controls/textBox/TextBoxStyle2";
import ButtonStyle1 from "../components/custom controls/buttons/ButtonStyle1"
import GoogleIcon from "../Images/GoogleIcon.png"
import Login_SingUp_bg from "../Images/Login_SingUp_bg.png"

export default function Login_SingUp(){
    const LoginButtonHandled =()=> {
        alert("hee");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const [loginFormData,setLoginFormData] = useState({
        email:'',
        password:''
    });
    return(
        <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Login_SingUp_bg})`  }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 w-[95%] md:w-[80%] lg:w-[50%] h-[500px] bg-white rounded-lg shadow-md">
                {/*image section*/}
                <div className="hidden sm:block">
                    <img src={Login_SingUp_image} alt="Univ-Boumerdes-Image" className="w-full h-full object-fill rounded-l-lg"/>
                </div>
                {/* Login and sing up section */}
                <div className="flex flex-col justify-between">
                    {/* Student_adminstation switch and welcom part */}
                        <LabelStyle1 labelText="Login" labelClassName="mt-10 text-3xl justify-self-center"/>
                    {/* Login_singUP form */}
                    <form className="bg-white flex flex-col mb-5 ml-10 w-[80%]">
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
                    <button className={`text-gray-500 rounded-[5px] p-2 text-[12px] font-Cairo bg-white shadow-md mt-8`}>
                        <div className="flex justify-center">
                            <img src={GoogleIcon} alt="Button Icon" className="w-4 h-4 mr-2 mt-[1px]"/>
                            Sing with Google
                        </div>
                    </button>
                    <p className="text-gray-400 text-xs mt-2">Dont have Account? <a href="#" className="text-blue-400">Sing up</a></p>
                    </form>
                    <ToggleButton toggleButtonClassName="justify-center mb-3" leftLabel="Administration" rightLabel="Student"/>
                </div>
            </div>
        </div>
    );
}