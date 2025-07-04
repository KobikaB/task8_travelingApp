import { Link } from "react-router";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import type { RegisterPage } from "@/types/Typescript";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterPage>({
    Fname: "",
    Lname: "",
    email: "",
    Password: "",
    ConfirmPassword: "",
    role: "passenger",
  });

  const viewPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const ChangeV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.Password !== formData.ConfirmPassword) {
      toast.error("Password not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.Password
      );

      const user = userCredential.user;
      const collectionName =
        formData.role === "passenger" ? "passengers" : "vowners";

      await setDoc(doc(db, collectionName, user.uid), {
        userid: user.uid,
        Fname: formData.Fname,
        Lname: formData.Lname,
        Email: formData.email,
        role: formData.role,
      });

      const fullDetail = {
        uid: user.uid,
        Email: formData.email,
        Fname: formData.Fname,
        Lname: formData.Lname,
        avatar: "",
        role: formData.role,
      };
     localStorage.setItem("user", JSON.stringify(fullDetail));
      console.log(user)

      toast.success("User successfully registered and data saved!");
      navigate("/login");
    } catch (error: any) {
      if (error.code === "email-already-in-use") {
        toast.error("This email is already registered. Please login.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-blue-600 px-6 py-12">
        <img
          className="mx-auto h-20 w-auto rounded-full mt-4"
          src="https://res.cloudinary.com/dq5buemig/image/upload/v1751567816/ir75iiaon8f6sqjmcqi1.jpg"
          alt="Your Company"
        />

        <h2 className=" text-center text-2xl font-bold tracking-tight text-white">
          Sign up your account
        </h2>

        <div className="mt-8 w-full max-w-sm">
          <form
            onSubmit={handleRegister}
            className="flex flex-col items-center gap-5"
            action="#"
            method="POST"
          >
            <div className="flex flex-col gap-3 mt-6 w-full  ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
                <input
                  type="text"
                  name="Fname"
                  placeholder="Firstname"
                  value={formData.Fname}
                  onChange={ChangeV}
                  pattern="[A-Za-z]+"
                  title="Only letters allowed"
                  className="p-2 border-2 rounded block w-full sm:text-sm  bg-white"
                />
                <input
                  type="text"
                  name="Lname"
                  placeholder="Lastname"
                  value={formData.Lname}
                  onChange={ChangeV}
                  pattern="[A-Za-z]+"
                  title="Only letters allowed"
                  className="p-2 border-2 rounded  bg-white block w-full sm:text-sm"
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={ChangeV}
                className="p-2 border-2 rounded  bg-white block w-full"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="Password"
                  placeholder="Password"
                  value={formData.Password}
                  onChange={ChangeV}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  title="Must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
                  className="p-2 border-2 rounded block  bg-white w-full"
                />
                <button
                  type="button"
                  onClick={viewPassword}
                  className="absolute top-1/4 right-3 text-gray-400"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="ConfirmPassword"
                  placeholder="Confirm Password"
                  value={formData.ConfirmPassword}
                  onChange={ChangeV}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  title="Must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
                  className="p-2 border-2 rounded block  bg-white w-full"
                />
                <button
                  type="button"
                  onClick={viewPassword}
                  className="absolute top-1/4 right-3 text-gray-400"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4 gap-6 my-4  text-white">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="passenger"
                  checked={formData.role === "passenger"}
                  onChange={ChangeV}
                  className="mr-2 w-5 h-5"
                />
                Passenger
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="vowner"
                  checked={formData.role === "vowner"}
                  onChange={ChangeV}
                  className="mr-2 w-5 h-5"
                />
                Vehicle Owner
              </label>
            </div>

            <button
              type="submit"
              className=" text-white  py-3 px-6 rounded bg-gradient-to-r from-cyan-600 via-black hover:cursor-pointer hover:bg-gray-300 "
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-gray-300">
            Already have an account?
            <Link to="/login" className="text-white hover:underline  ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>

      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center object-cover"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dq5buemig/image/upload/v1751569106/nxutbtfsi1k2cg910weq.avif')" }}
      ></div>

      <ToastContainer />
    </div>
  );
}

export default Register;
