import React, { useState } from "react";
import Login_SignUp_bg from "../resources/Images/Login_SignUp_bg.png";
import Login_SignUp_image from "../resources/Images/Login_Signup_image.jpg"
import Login from "../components/Login_SignUp/Login";
import SignUp from "../components/Login_SignUp/SignUp";
import { use } from "i18next";

export default function Login_SignUp() {
  const [position, setPosition] = useState(0);
  const [isLoginPage,setLoginPage] = useState(true);

  const handleSignInClick = () => {
    setPosition(0);
    setLoginPage(true);
  };

  const handleSignUpClick = () => {
    setPosition(1);
    setLoginPage(false);
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Login_SignUp_bg})` }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 w-[80%] sm:w-[70%] md:w-[85%] lg:w-[70%] h-[500px] bg-white rounded-lg shadow-md relative">
        
        {/* عنصر الصورة */}
        <div
          className={`hidden md:block absolute h-full sm:w-1/2 shadow-lg transform transition-transform duration-500 ease-in-out z-10 ${
            position === 0 ? 'ltr:translate-x-0 rtl:translate-x-0' : 'ltr:translate-x-full rtl:-translate-x-full'
          }`}
        >
          <img
            src={Login_SignUp_image}
            alt="Univ-Boumerdes-Image"
            className={`w-full h-full object-cover ${isLoginPage ? 'rounded-l-lg' : 'rounded-r-lg'} hidden md:block`}
          />
        </div>
        
        {/* مكونات تسجيل الدخول والتسجيل */}
        <SignUp SingInButtonHandled={handleSignInClick} ClassName={`${isLoginPage ? 'hidden' : 'block'} md:flex`}/>
        <Login SignUpButtonHandled={handleSignUpClick} ClassName={`${!isLoginPage ? 'hidden' : 'block'} md:flex`}/>
        
      </div>
    </div>
  );
}
