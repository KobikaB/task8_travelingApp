import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import type { FormData} from "../types/Typescript";

import { toast, ToastContainer } from "react-toastify";

import { signInWithEmailAndPassword } from "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import bg1 from "@/assets/image/Lpic.avif";
import logo from "@/assets/image/travelLogo.jpeg";
import { useAuth } from "@/contexts/AuthProvider";

function Login() {
  const navigate = useNavigate();
  const { user,setUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    role: "passenger",
  });


  useEffect(()=>{
    if(user){
      if(user.role === "passenger"){
        navigate("/phome",{ replace: true });
      }else if(user.role === "vowner"){
        navigate("/vhome",{ replace: true });
      }
    }
  },[user])

  const viewPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const collectionName =
      formData.role === "passenger" ? "passengers" : "vowners";

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((res) => {
        return getDoc(doc(db, collectionName, res.user.uid)).then((docSnap) => {
          if (!docSnap.exists()) {
            toast.error("User not found");
            return;
          }

          const userData = docSnap.data();

          const user = {
            uid: res.user.uid,
           Fname: userData.Fname,  
        Lname: userData.Lname,
        avatar: userData.avatar,
            email: res.user.email!,
            role: userData.role,
          };

          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("role", userData.role);

        

          toast.success("Login successful!");

          if(userData.role === "passenger"){
            navigate("/phome");

          }else{
            navigate("/vhome");
          }
          console.log("User data from Firestore:", userData);
          console.log("Logging in as role:", userData.role);
setUser(user)
       
        });
      })
      .catch((error) => {
        toast.error("login failed" + error.message);
      });
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-r from-cyan-900 via-cyan-500 px-6 py-12">
        <img
          className="mx-auto h-20 w-auto rounded-full mt-4"
          src={logo}
          alt="logo"
        />

        <h2 className="text-center text-2xl font-bold tracking-tight text-white">
          Login App
        </h2>

        <div className="mt-8 w-full max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                
                required
                className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
               
                  required
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={viewPassword}
                  className="absolute top-1/4 right-3 text-black"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>

              <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm text-indigo-900 hover:text-indigo-300 font-bold"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4  my-4  text-white">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="passenger"
                  checked={formData.role === "passenger"}
                  onChange={handleChange}
                  className="mr-2 w-5 h-5 hover:cursor-pointer"
                />
                Passenger
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  checked={formData.role === "vowner"}
                  onChange={handleChange}
                  value="vowner"
                  className="mr-2 w-5 h-5 hover:cursor-pointer"
                />
                Vehicle Owner
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-indigo-900 px-3 py-1.5 text-white text-sm font-semibold hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            If you don't have an account?
            <Link to="/register" className="text-blue-600 hover:underline ml-1">
              Register
            </Link>
          </p>
        </div>
      </div>

      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center  object-cover"
        style={{ backgroundImage: `url(${bg1})` }}
      ></div>

      <ToastContainer />
    </div>
  );
}

export default Login;
