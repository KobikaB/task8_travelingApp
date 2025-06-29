import React from "react";
import { useNavigate } from "react-router";
import logo1 from "../images/travelLogo.jpeg";
import { Button } from "@/components/ui/button";
import { ToastContainer } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className=" bg-gradient-to-r from-cyan-400/50 via-blue-900 h-20 fixed top-0 w-screen z-50 ">
      <div className="flex items-center justify-between px-4 md:px-10 h-full">
        <img
          src={logo1}
          alt="logo"
          className="h-12 sm:h-13 md:h-14 lg:h-16 rounded-full bg-amber-200 cursor-pointer "
        />

        <ul>
          <div className="flex gap-8 ">
            <Button
              variant="outline"
              className="text-sm hover:cursor-pointer bg-black/60 text-white"
            >
              Profile
            </Button>
            <Button
              variant="outline"
              className="text-sm hover:cursor-pointer bg-black/60 text-white"
              onClick={() => navigate("/login", { replace: true })}
            >
              Logout
            </Button>
          </div>
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
