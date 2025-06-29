
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user.uid){
    return <Navigate to="/login" replace />;
  } 

 
  if (user.role !== "passenger" && user.role !== "vowner") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
