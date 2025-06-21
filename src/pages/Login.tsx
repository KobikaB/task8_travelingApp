import React, { useState } from "react";
import { useNavigate } from "react-router";

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import type { FormData } from "../types/Typescript";

import { toast, ToastContainer } from "react-toastify";

import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    Email: "",
    Password: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRole = (role: string) => {
    if (role === "passenger") {
      navigate("/phome");
    } else {
      navigate("/vhome");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      toast.error("Please select a role.");
      return;
    }

    signInWithEmailAndPassword(auth, formData.Email, formData.Password)
      .then((res) => getDoc(doc(db, "users", res.user.uid)))
      .then((docSnap) => {
        if (!docSnap.exists()) return toast.error("User not found");
        const role = docSnap.data().role;
        if (role !== formData.role) {
          return toast.error("Role mismatch");
        }
        handleRole(role);
      })
      .catch((error) => toast.error("Login failed: " + error.message));
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-r from-cyan-900 via-cyan-500 px-6 py-12">
        <img
          className="mx-auto h-20 w-auto rounded-full"
          src="/src/images/travelLogo.jpeg"
          alt="logo"
        />

        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-white">
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
                name="Email"
                value={formData.Email}
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
              <input
                type="password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
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
                  onChange={handleChange}
                  className="mr-2 w-5 h-5"
                />
                Passenger
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
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
        </div>
      </div>

      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center  object-cover"
        style={{ backgroundImage: "url('./src/Images/Lpic.avif')" }}
      ></div>

      <ToastContainer />
    </div>
  );
}

export default Login;
