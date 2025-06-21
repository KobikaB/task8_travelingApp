import { Link } from "react-router";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config"


function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Fname: "",
    Lname: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    role: "",
  });

  const ChangeV = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

   

    if (formData.Password !== formData.ConfirmPassword) {
      console.log("Password not match");
      return;
    }

 

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.Email,
        formData.Password
      );

      const user = userCredential.user;
await setDoc(doc(db, "users", user.uid), {
    Fname: formData.Fname,
    Lname: formData.Lname,
    Email: formData.Email,
    role: formData.role,
   
  });


      console.log("User successfully registered and data saved!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-blue-600 px-6 py-12">
        <img
          className="mx-auto h-20 w-auto rounded-full mt-4"
          src="./src/images/travelLogo.jpeg"
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
                  className="p-2 border-2 rounded block w-full sm:text-sm "
                />
                <input
                  type="text"
                  name="Lname"
                  placeholder="Lastname"
                  value={formData.Lname}
                  onChange={ChangeV}
                  pattern="[A-Za-z]+"
                  title="Only letters allowed"
                  className="p-2 border-2 rounded block w-full sm:text-sm"
                />
              </div>
              <input
                type="email"
                name="Email"
                placeholder="Email"
                value={formData.Email}
                onChange={ChangeV}
                className="p-2 border-2 rounded block w-full"
              />
              <input
                type="password"
                name="Password"
                placeholder="Password"
                value={formData.Password}
                onChange={ChangeV}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
                className="p-2 border-2 rounded block  w-full"
              />
              <input
                type="password"
                name="ConfirmPassword"
                placeholder="Confirm Password"
                value={formData.ConfirmPassword}
                onChange={ChangeV}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
                className="p-2 border-2 rounded block  w-full"
              />
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
              className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-400 "
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?
            <Link to="/login" className="text-blue-600 hover:underline  ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>

      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center object-cover"
        style={{ backgroundImage: "url('./src/Images/carpic.avif')" }}
      ></div>
    </div>
  );
}

export default Register;
