import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("jwt");
  if (!token) {
    return <Navigate to="/Login_SignUp/login" replace />;
  }
  return children;
}
