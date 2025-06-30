import { Button } from "@/components/ui/button";
import { db } from "@/firebase/config";
import defaultAvatar from "@/images/carpic.jpeg";
import type { profileData } from "@/types/Typescript";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { toast, ToastContainer } from "react-toastify";

function Profile() {
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
    const User = JSON.parse(localStorage.getItem("user")!);
    setFormData(User);
    setUser(User);
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

  return (
    <div className="max-w-md mx-auto mt-30 p-6 bg-blue-400 shadow rounded">
      <div className="flex flex-col items-center">
        {editMode ? (
          <>
            <img
              src={formData.avatar || defaultAvatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover mb-3"
            />

            <input type="file" onChange={handleAvatarChange} className="mb-4" />

            <input
              type="text"
              name="Fname"
              placeholder="First Name"
              value={formData.Fname}
              onChange={handleChange}
              className="w-full mb-2 p-2 rounded border"
            />

            <input
              type="text"
              name="Lname"
              placeholder="Last Name"
              value={formData.Lname}
              onChange={handleChange}
              className="w-full mb-2 p-2 rounded border"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-4 p-2 rounded border"
            />
            <div className="flex gap-4">
              <Button
                onClick={handleSave}
                className="bg-gray-400  px-4 py-2 rounded hover:bg-gray-500"
              >
                Save
              </Button>

              <Button
                className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-500 "
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
              className="w-32 h-32 rounded-full object-cover mb-4"
            />

            <p className="text-gray-700 border-2 border-amber-950 block w-full bg-gray-400 text-center">
              {user.email}
            </p>
            <p className="text-gray-700 border-2 border-amber-950 block w-full bg-gray-400 mt-5 text-center">
              {user.role}
            </p>

            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-5"
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
