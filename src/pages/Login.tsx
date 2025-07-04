import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import type { FormData, UserRole } from "../types/Typescript";

import { toast, ToastContainer } from "react-toastify";

import { signInWithEmailAndPassword } from "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    Password: "",
    role: "passenger",
  });

  const viewPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRole = (role: UserRole) => {
    if (role === "passenger") {
      navigate("/phome");
    } else if (role === "vowner") {
      navigate("/vhome");
    } else {
      toast.error("Unknown user role. Please contact support.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const collectionName =
      formData.role === "passenger" ? "passengers" : "vowners";

    signInWithEmailAndPassword(auth, formData.email, formData.Password)
      .then((res) => {
        return getDoc(doc(db, collectionName, res.user.uid)).then((docSnap) => {
          if (!docSnap.exists()) {
            toast.error("User not found");
            return;
          }

          const userData = docSnap.data();

          const user = {
            uid: res.user.uid,
            Fname: userData.Fname ,
            Lname: userData.Lname ,
            email: res.user.email,
            role: userData.role,
            avatar: userData.avatar ,
          };

          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("role", userData.role);

          toast.success("Login successful!");
          console.log("User data from Firestore:", userData);
          console.log("Logging in as role:", userData.role);

          handleRole(userData.role as UserRole);
        });
      })
      .catch((error) => toast.error("Login failed: " + error.message));
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-r from-cyan-900 via-cyan-500 px-6 py-12">
        <img
          className="mx-auto h-20 w-auto rounded-full mt-4"
          src="https://res.cloudinary.com/dq5buemig/image/upload/v1751567816/ir75iiaon8f6sqjmcqi1.jpg"
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
              <label className="block text-sm font-medium text-white">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  autoComplete="current-password"
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
                  className="mr-2 w-5 h-5"
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
                  className="mr-2 w-5 h-5"
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
        style={{ backgroundImage: "url('https://res.cloudinary.com/dq5buemig/image/upload/v1751567752/lm0rx7a89oa65w7gmz0m.avif')" }}
      ></div>

      <ToastContainer />
    </div>
  );
}

export default Login;
