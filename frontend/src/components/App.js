import React, { useEffect } from "react";
import LoginSignUp from "pages/Authentication/Login_SignUp";
import StudentIDCard from "pdfGenerator/StudentIDCard";
import BlockAcademicYear from "pdfGenerator/BlockAcademicYear";
import RegistrationCertificate from "pdfGenerator/RegistrationCertificate";
import InternshipPermit from "pdfGenerator/InternshipPermit";
import LibaryCard from "pdfGenerator/LibaryCard";
import ParkingPermit from "pdfGenerator/ParkingPermit";
import GradeTranscript from "pdfGenerator/GradeTranscript";
import AdministrationMainPage from "pages/AdministrationSide/AdministrationMainPage"
import { createBrowserRouter } from "react-router-dom";
import EtudientDashboard from "pages/StudentSide/EtudientDashboard";
import { RouterProvider } from "react-router-dom";
import GroupChangeRequest from "groupchange";
import EtudientMainPage from "pages/StudentSide/EtudientMainPage";
import dataGridViewStyle3 from "./custom controls/data grid view/dataGridViewStyle3";
import DocumentRequestsAdmin from "pages/AdministrationSide/DocumentRequestsAdmin";
import VisualRequestsAdmin from "pages/AdministrationSide/VisualRequestsAdmin";

import Login_SignUp from "pages/Authentication/Login_SignUp";
import DocumentRequests from "pages/StudentSide/DocumentRequests";
const routes = [
  {
    path: "/",
    element: <DocumentRequests/>,
  },
  {
    path: "/EtudientMainPage",
   element: <EtudientMainPage />,
  },
  {
    path: "/DocumentRequest/StudentIDCard",
    element: <StudentIDCard />,
  },
  {
    path: "/DocumentRequest/BlockAcademicYear",
    element: <BlockAcademicYear />,
  },
  {
    path: "/DocumentRequest/RegistrationCertificate",
    element: <RegistrationCertificate />,
  },
{
    path: "/DocumentRequest/GradeTranscript",
    element: <GradeTranscript />,
  },
  {
    path: "/DocumentRequest/InternshipPermit",
    element: <InternshipPermit />,
  },
  {
    path: "/DocumentRequest/LibaryCard",
    element: <LibaryCard />,
  },
  {
    path: "/DocumentRequest/ParkingPermit",
    element: <ParkingPermit />,
  },
  {
    path: "/AdministrationMainPage",
   element: <AdministrationMainPage />,
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,        // لتعديل مسارات splat
    v7_fetcherPersist: true,          // لتغيير سلوك fetchers
    v7_normalizeFormMethod: true,     // لجعل formMethod بأحرف كبيرة
    v7_partialHydration: true,        // لتغيير سلوك hydration
    v7_skipActionErrorRevalidation: true, // لتخطي إعادة التحقق بعد أخطاء actions
    v7_startTransition: true,         // لتفعيل React.startTransition لتحديثات الحالة
  },
});

export default function App() {
 {/*const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
*/}
  return <RouterProvider router={router} />;
}