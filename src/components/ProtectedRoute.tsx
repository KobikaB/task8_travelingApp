import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { auth, db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";

interface ProtectedRouteProps {
  requiredRole: "passenger" | "vowner";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const lisenseRemove = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.role === requiredRole) {
              setIsAuthorized(true); // Role matches
            } else {
              setIsAuthorized(false); // Role mismatch
            }
          } else {
            setIsAuthorized(false); // User data doesn't exist
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsAuthorized(false);
        }
      } else {
        setIsAuthorized(false); // Not logged in
      }

      setLoading(false);
    });

    return () => lisenseRemove();
  }, [requiredRole]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
