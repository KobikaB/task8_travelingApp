import { Button } from "@/components/ui/button";
import { db } from "@/firebase/config";
import type { profileData } from "@/types/Typescript";
import uploadImageToCloudinary from "@/utils/uploadImageToCloudinary";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { toast, ToastContainer } from "react-toastify";

const defaultAvatar =
  "https://res.cloudinary.com/dq5buemig/image/upload/v1751573116/xxdfokffjsoouc45b86k.jpg";

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

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const luser = JSON.parse(localStorage.getItem("user")!);
    if (luser) {
      setUser(luser);
    } else {
      navigate("/login");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);

      //Upload the image to cloudinary
      const url = await uploadImageToCloudinary(file, "vehicleImages/Avatar");
      setUser((prev) => ({ ...prev, avatar: url }));
      toast.success("avatar upload");
    } catch {
      toast.error("failed to upload the avatar");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const updated = {
        Fname: user.Fname,
        Lname: user.Lname,
        email: user.email,
        avatar: user.avatar,
      };
      const collectionName =
        user.role === "passenger" ? "passengers" : "vowners";

      await updateDoc(doc(db, collectionName, user.uid), updated);

      localStorage.setItem("user", JSON.stringify(user));

      setEditMode(false);
      toast.success("profile page updated succefully");
    } catch (error) {
      toast.error("Profile page updated error");
    }
  };

  const handleBack = () => {
    if (user.role === "passenger") {
      navigate("/phome");
    } else {
      navigate("/vhome");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-600 via-cyan-500 p-3">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col items-center gap-3 ">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className=" self-start   cursor-pointer mb-4"
            onClick={handleBack}
          />
          {editMode ? (
            <>
              <img
                src={user.avatar || defaultAvatar}
                alt="Avatar"
                className="w-32 h-32 rounded-full  object-cover mb-3"
              />

              <input
                type="file"
                onChange={handleAvatarChange}
                className="mb-4"
              />

              <input
                type="text"
                name="Fname"
                placeholder="First Name"
                value={user.Fname}
                onChange={handleChange}
                pattern="[A-Za-z]+"
                title="Only letters allowed"
                className="p-2 border-2 rounded  bg-white block w-full sm:text-sm"
              />

              <input
                type="text"
                name="Lname"
                placeholder="Last Name"
                value={user.Lname}
                onChange={handleChange}
                pattern="[A-Za-z]+"
                title="Only letters allowed"
                className="p-2 border-2 rounded  bg-white block w-full sm:text-sm"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
                className="p-2 border-2 rounded  bg-white block w-full sm:text-sm"
              />
              <div className="flex gap-4 mt-4">
                {loading ? (
                  "Uploading....."
                ) : (
                  <>
                    <Button
                      onClick={handleSave}
                      className="bg-gray-400  px-4 py-2 rounded hover:bg-gray-500 hover:cursor-pointer "
                    >
                      Save
                    </Button>
                  </>
                )}

                <Button
                  className="bg-gray-400  px-4 py-2 rounded hover:bg-gray-500 hover:cursor-pointer "
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
                className="w-40 h-40 rounded-full object-cover border-2 border-blue-950 "
              />
              <div className=" p-5 text-center rounded-2xl">
                <p className="text-blue-900 mb-1 text-xl font-bold ">
                  {user.Fname} {user.Lname}
                </p>

                <p className=" text-blue-900 mb-1 text-xl font-bold ">
                  {user.email}
                </p>
                <p className="  text-blue-900 mb-1 text-xl ">
                  Role:{user.role}
                </p>
              </div>

              <button
                onClick={() => {
                  setEditMode(true);
                }}
                className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700 mt-5 hover:cursor-pointer"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
