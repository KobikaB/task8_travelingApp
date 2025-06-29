
import { Navigate, Outlet } from "react-router";

const ProtectedPassengerRoute = () => {
 const user = JSON.parse(localStorage.getItem("user") || "null");



  if (user.role !== "passenger"){
    return <Navigate to="/login" replace />;
  } 

  

  return <Outlet />;
};

export default ProtectedPassengerRoute;