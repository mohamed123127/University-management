import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EtudientMainPage from "pages/EtudientMainPage";
import LoginSignUp from "pages/Login_SignUp";

const routes = [
  {
    path: "/",
    element: <LoginSignUp />,
  },
  {
    path: "/EtudientDashboard",
    element: <EtudientMainPage />,
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
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return <RouterProvider router={router} />;
}
