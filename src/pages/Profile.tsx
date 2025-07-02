import { Button } from "@/components/ui/button";
import { db } from "@/firebase/config";
import defaultAvatar from "@/images/avatar.jpg";
import type { profileData } from "@/types/Typescript";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { toast, ToastContainer } from "react-toastify";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<profileData>({
    Fname: "",
    Lname: "",
    email: "",
    avatar: "",
    role: "passenger",
    uid: "",
  });
  const [formData, setFormData] = useState<profileData>(user);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const luser = JSON.parse(localStorage.getItem("user")!);
    setFormData(luser);
    setUser(luser);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, avatar: reader.result as string }));
    };

    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const updated = {
        Fname: formData.Fname,
        Lname: formData.Lname,
        email: formData.email,
        avatar: formData.avatar,
      };
      const collectionName =
        formData.role === "passenger" ? "passengers" : "vowners";

      await updateDoc(doc(db, collectionName, formData.uid), updated);

      localStorage.setItem("user", JSON.stringify({ ...formData }));
      setUser(formData);
      setEditMode(false);
      toast.success("profile page updated succefully");
    } catch (error) {
      toast.error("updated error");
    }
  };

  const handleBack = () => {
    if (user.role === "passenger") {
      navigate("/phome");
    } else if (user.role === "vowner") {
      navigate("/vhome");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-30 p-6 bg-gradient-to-r from-cyan-600 via-cyan-500 shadow rounded">
      <div className="flex flex-col items-center gap-3">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className=" place-self-start gap-2 text-white cursor-pointer hover:text-black mb-4"
          onClick={handleBack}
        />
        {editMode ? (
          <>
            <img
              src={formData.avatar || defaultAvatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full  object-cover mb-3"
            />

            <input 
            type="file"
             onChange={handleAvatarChange}
              className="mb-4" />

            <input
              type="text"
              name="Fname"
              placeholder="First Name"
              value={formData.Fname}
              onChange={handleChange}
              pattern="[A-Za-z]+"
              title="Only letters allowed"
              className="p-2 border-2 rounded  bg-white block w-full sm:text-sm"
            />

            <input
              type="text"
              name="Lname"
              placeholder="Last Name"
              value={formData.Lname}
              onChange={handleChange}
              pattern="[A-Za-z]+"
              title="Only letters allowed"
              className="p-2 border-2 rounded  bg-white block w-full sm:text-sm"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border-2 rounded  bg-white block w-full sm:text-sm"
            />
            <div className="flex gap-4 mt-4">
              <Button
                onClick={handleSave}
                className="bg-gray-400  px-4 py-2 rounded hover:bg-gray-500 "
              >
                Save
              </Button>

              <Button
                className="bg-gray-400  px-4 py-2 rounded hover:bg-gray-500 "
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <img
              src={user.avatar || defaultAvatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover "
            />
            <div className=" p-5 text-center rounded-2xl">
              <p className="text-blue-900 mb-1 text-2xl font-bold">
                {user.Fname} {user.Lname}
              </p>

              <p className=" text-blue-900 mb-1 text-2xl font-bold">
                {user.email}
              </p>
              <p className="  text-blue-900 mb-1 text-xl ">Role:{user.role}</p>
            </div>

            <button
              onClick={() => {
                setFormData(user);
                setEditMode(true);
              }}
              className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700 mt-5"
            >
              Edit Profile
            </button>
          </>
        )}
        ;
      </div>

      <ToastContainer />
    </div>
  );
}

export default Profile;
