import React, { useEffect } from "react";
import LoginSignUp from "pages/Login_SignUp";
import StudentIDCard from "pdfGenerator/StudentIDCard";
import BlockAcademicYear from "pdfGenerator/BlockAcademicYear";
import RegistrationCertificate from "pdfGenerator/RegistrationCertificate";
import InternshipPermit from "pdfGenerator/InternshipPermit";
import LibaryCard from "pdfGenerator/LibaryCard";
import ParkingPermit from "pdfGenerator/ParkingPermit";
import GradeTranscript from "pdfGenerator/GradeTranscript";
import AdministrationMainPage from "pages/AdministrationMainPage"
import { createBrowserRouter } from "react-router-dom";
import EtudientDashboard from "pages/EtudientDashboard";
import { RouterProvider } from "react-router-dom";
import GroupChangeRequest from "groupchange";
import Login from "./Login_SignUp/Login";
import EtudientMainPage from "pages/EtudientMainPage"



const routes = [
  {
    path: "/",
    element: <LoginSignUp />,
  },
  {
    path: "/EtudientDashboard",
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

