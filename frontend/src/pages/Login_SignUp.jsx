import React, { useState } from "react";
import Login_SignUp_bg from "../resources/Images/Login_SignUp_bg.png";
import Login_SignUp_image from "../resources/Images/Login_Signup_image.jpg"
import Login from "../components/Login_SignUp/Login";
import SignUp from "../components/Login_SignUp/SignUp";

export default function Login_SignUp() {
  const [position, setPosition] = useState(0);

  const handleSignInClick = () => {
    setPosition(0);
  };

  const handleSignUpClick = () => {
    setPosition(1);
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Login_SignUp_bg})` }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 w-[95%] md:w-[80%] lg:w-[60%] h-[500px] bg-white rounded-lg shadow-md relative">
        
        {/* عنصر الصورة */}
        <div
          className={`hidden sm:block absolute h-full sm:w-1/2 shadow-lg transform transition-transform duration-500 ease-in-out z-10 ${
            position === 0 ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <img
            src={Login_SignUp_image}
            alt="Univ-Boumerdes-Image"
            className={`w-full h-full object-cover ${position === 0 ? 'rounded-l-lg' : 'rounded-r-lg'}`}
          />
        </div>
        
        {/* مكونات تسجيل الدخول والتسجيل */}
        <SignUp SingInButtonHandled={handleSignInClick} />
        <Login SignUpButtonHandled={handleSignUpClick} />
        
      </div>
    </div>
  );
}
