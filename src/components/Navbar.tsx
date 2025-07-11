import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/contexts/AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleLogoClick = () => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user.role === "vowner") {
      navigate("/vhome");
    } else if (user.role === "passenger") {
      navigate("/phome");
    }
  };

  return (
    <div className=" bg-gradient-to-r from-cyan-400/50 via-blue-900 h-20 fixed top-0 w-screen z-50 ">
      <div className="flex items-center justify-between px-4 md:px-10 h-full">
        <img
          src="https://res.cloudinary.com/dq5buemig/image/upload/v1751567816/ir75iiaon8f6sqjmcqi1.jpg"
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
