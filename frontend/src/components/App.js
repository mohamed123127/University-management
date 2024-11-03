import React, { useState } from "react";
import Login_SignUp from "../pages/Login_SignUp";
import Test1 from "./test/test1";
import SignUp from "./SignUp";
import SlideBox from "./test/SlideBox";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EtudientDashboard from '../pages/EtudientDashboard'


export default function App(){

  return(
    <Router>
    <div>
      <Routes>
        {/* مسار الصفحة الرئيسية يشير إلى صفحة تسجيل الدخول */}
        <Route path="/" element={<Login_SignUp />} />
        {/* مسار لوحة التحكم الخاصة بالطلاب */}
        <Route path="/EtudientDashboard" element={<EtudientDashboard />} />
      </Routes>
    </div>
  </Router>
  );
}