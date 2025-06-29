
import { Navigate, Outlet } from "react-router";

const ProtectedVownerRoute = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");



  if (user.role !== "vowner"){
    return <Navigate to="/login" replace />;
  } 

  return <Outlet />;
};

export default ProtectedVownerRoute;