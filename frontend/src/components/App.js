import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EtudientMainPage from "pages/EtudientMainPage";
import Login_SignUp from "pages/Login_SignUp";
import PdfGenerator from "pdfGenerator/Certafica";
import LibraryCardRequest from "pdfGenerator/LibaryCard";
import StudentIDCardRequest from "pdfGenerator/IdStudentCard";
import BlockAcademicYearRequest from "pdfGenerator/BlockAcademicYea";
import ParkingPermitRequest from "pdfGenerator/ParkingPermit";
import InternshipPermitRequest from "pdfGenerator/InternshipPermit";
import GradeTranscriptRequest from "pdfGenerator/GradeTranscript";
import DocumentRequests from "../pages/DocumentRequest";

export default function App(){
  return(
   <div>
   <DocumentRequests/>
   </div>
  );
}