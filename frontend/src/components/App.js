import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EtudientMainPage from "pages/EtudientMainPage";
import Login_SignUp from "pages/Login_SignUp";

export default function App(){
  return(
    <Router>
    <div>
      <Routes>
        {/* مسار الصفحة الرئيسية يشير إلى صفحة تسجيل الدخول */}
        {/*<Route path="/" element={<Header ActualPage='Dashboard' ActualPageIcon={FiGrid}/>} />*/}
        {/*<Route path="/" element={<EtudientMainPage />}/>*/}
        <Route path="/" element={<Login_SignUp />} />
        {/* مسار لوحة التحكم الخاصة بالطلاب */}
        <Route path="/EtudientDashboard" element={<EtudientMainPage />} />
      </Routes>
    </div>
  </Router>
  );
}