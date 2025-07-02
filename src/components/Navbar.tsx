import React from "react";
import { useNavigate } from "react-router";
import logo1 from "../images/travelLogo.jpeg";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    navigate("/login");
  };

  const handleLogoClick = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if(user.role === "vowner"){
      navigate("/vhome");
    }else if(user.role === "passenger"){
      navigate("/phome")
    }else{
      navigate("/login")
    }
  }

  return (
    <div className=" bg-gradient-to-r from-cyan-400/50 via-blue-900 h-20 fixed top-0 w-screen z-50 ">
      <div className="flex items-center justify-between px-4 md:px-10 h-full">
        <img
          src={logo1}
          alt="logo"
          onClick={handleLogoClick}
          className="h-12 sm:h-13 md:h-14 lg:h-16 rounded-full bg-amber-200 cursor-pointer "
        />

        <ul>
          <div className="flex gap-8 ">
            <Button
              variant="outline"
              className="text-sm hover:cursor-pointer bg-black/60 text-white"
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </Button>
            <Button
              variant="outline"
              className="text-sm hover:cursor-pointer bg-black/60 text-white"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
