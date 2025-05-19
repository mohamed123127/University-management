import React, { useEffect } from "react";
import LoginSignUp from "pages/Authentication/Login_SignUp";
import StudentIDCard from "pdfGenerator/StudentIDCard";
import BlockAcademicYear from "pdfGenerator/BlockAcademicYear";
import RegistrationCertificate from "pdfGenerator/RegistrationCertificate";
import InternshipPermit from "pdfGenerator/InternshipPermit";
import LibaryCard from "pdfGenerator/LibaryCard";
import ParkingPermit from "pdfGenerator/ParkingPermit";
import GradeTranscript from "pdfGenerator/GradeTranscript";
import AdministrationMainPage from "../pages/AdministrationSide/AdministrationMainPage"
import { createBrowserRouter } from "react-router-dom";
import EtudientDashboard from "pages/StudentSide/EtudientDashboard";
import { RouterProvider } from "react-router-dom";
import GroupChangeRequest from "pages/StudentSide/groupchange";
import EtudientMainPage from "pages/StudentSide/EtudientMainPage";
import dataGridViewStyle3 from "./custom controls/data grid view/dataGridViewStyle3";
import DocumentRequestsAdmin from "pages/AdministrationSide/DocumentRequestsAdmin";
import VisualRequestsAdmin from "pages/AdministrationSide/VisualRequestsAdmin";
import StudentsTable from "pages/AdministrationSide/Students";
import Login_SignUp from "pages/Authentication/Login_SignUp";
import DocumentRequests from "pages/StudentSide/DocumentRequests";
import Student from "js/models/Student";
import StudentRoleSelector from "pages/test";
import AttestationBonneConduite from "pdfGenerator/attestationBonneConduite";
import AttestastionClassement from "pdfGenerator/attestastionClassement";
import AttestationMajorPromotion from "pdfGenerator/Attestation-MajorPromotion";
import Attestation1 from "pdfGenerator/attestation1";
import Attestation2 from "pdfGenerator/attestation2";
import Attestation3 from "pdfGenerator/attestation3";
import AttestationBonneConduite1 from "pdfGenerator/attestationBonneConduite1";
import AttestationClassement2 from "pdfGenerator/attestationClassement2";
import CertificatScolarite from "pdfGenerator/CertificaScolarite";
import Prestage from "pdfGenerator/preStage";
import FicheDePresenceDeStage from "pdfGenerator/ficheDePresenceDeStage";
import ProlongationStage from "pdfGenerator/prolongationStage";
import RecommandationStageDintégration from "pdfGenerator/stageIntgration";
import SoutenanceMFE from "pdfGenerator/SoutenanceMFE";
import AttestationAbandonDesEtudes from "pdfGenerator/AttestationAbandonDesEtudes";
import AttestationNonRéinscription from "pdfGenerator/AttestationNonRéinscription";
import ConventionDePreStage from "pdfGenerator/conventionDePreStage";

const routes = [
  {
    path: "/",

    element: <Login_SignUp/>,

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
    path: "/DocumentRequest/CertificatScolarite2",
    element: <CertificatScolarite />,
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
    path: "/DocumentRequest/attestationBonneConduite",
    element: <AttestationBonneConduite />,
  },
  {
    path: "/DocumentRequest/attestationClassement",
   element: <AttestastionClassement />,
  },
  {
    path: "/DocumentRequest/attestationClassement2",
   element: <AttestationClassement2 />,
  },
  {
    path: "/DocumentRequest/Attestation-MajorPromotion",
   element: <AttestationMajorPromotion />,
  },
  {
    path: "/DocumentRequest/attestation1",
   element: <Attestation1 />,
  },
  {
    path: "/DocumentRequest/attestation2",
   element: <Attestation2 />,
  },
  {
    path: "/DocumentRequest/attestation3",
   element: <Attestation3 />,
  },
  {
    path: "/DocumentRequest/attestationBonneConduite1",
   element: <AttestationBonneConduite1 />,
  },
  {
    path: "/DocumentRequest/Prestage",
   element: <Prestage />,
  },
  {
    path: "/DocumentRequest/ficheDePresenceDeStage",
   element: <FicheDePresenceDeStage />,
  },
  {
    path: "/DocumentRequest/prolongationStage",
   element: <ProlongationStage />,
  },
  {
    path: "/DocumentRequest/stageIntgration",
   element: <RecommandationStageDintégration />,
  },
  {
    path: "/DocumentRequest/SoutenanceMFE",
   element: <SoutenanceMFE />,
  },
  {
    path: "/DocumentRequest/AttestationAbandonDesEtudes",
   element: <AttestationAbandonDesEtudes />,
  },
  {
    path: "/DocumentRequest/conventionDePreStage",
   element: <ConventionDePreStage />,
  },
  {
    path: "/DocumentRequest/AttestationNonRéinscription",
   element: <AttestationNonRéinscription />,
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
