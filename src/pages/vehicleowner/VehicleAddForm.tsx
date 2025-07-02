import React, { useState } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

import axios from "axios";
import type { vehicleFormData } from "@/types/Typescript";
import { toast, ToastContainer } from "react-toastify";

function VehicleAddForm() {
  const [formData, setFormData] = useState<vehicleFormData>({
    model: "",
    seats: undefined,
    type: "",
    licensePlate: "",
    fees: undefined,
    available: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vehicles");
    formData.append("folder", "vehicleImages");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dq5buemig/image/upload",
      formData
    );

    return res.data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user")!);

    try {
      const imageUrl = await uploadImageToCloudinary(imageFile!);

      await addDoc(collection(db, "vehicles"), {
        model: formData.model,
        seats: formData.seats,
        type: formData.type,
        licensePlate: formData.licensePlate,
        fees: formData.fees,
        available: formData.available,
        images: [imageUrl],
        ownerId: user.uid,
        ownerEmail: user.email,
        createdAt: new Date(),
      });

      toast.success("Vehicle added successfully!");

      navigate("/vhome");
    } catch (error) {
      toast.error("Failed to add vehicle.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cyan-800 px-4">
      <div className="w-full bg-white shadow-md rounded max-w-xl h-auto p-6">
        <h2 className="text-2xl mt-4 mb-6 text-center text-indigo-700/50">
          Add New Vehicle
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="model"
            placeholder="Vehicle Model"
            value={formData.model}
            onChange={handleChange1}
            className="w-full border p-2 rounded block"
            required
          />

          <input
            type="number"
            name="seats"
            placeholder="Number of Seats"
            value={formData.seats}
            onChange={handleChange1}
            className="w-full border p-2 rounded block"
            required
          />

          <input
            type="text"
            name="type"
            placeholder="Vehicle Type"
            value={formData.type}
            onChange={handleChange1}
            className="w-full border p-2 rounded block"
            required
          />

          <input
            type="text"
            name="licensePlate"
            placeholder="License Plate"
            value={formData.licensePlate}
            onChange={handleChange1}
            className="w-full border p-2 rounded block"
            required
          />

          <input
            type="number"
            name="fees"
            placeholder="Rental Fee"
            value={formData.fees}
            onChange={handleChange1}
            className="w-full border p-2 rounded block"
            required
            min={0}
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange2}
            />
            Available
          </label>

          <div>
            <label className="block mb-1">Upload Vehicle Image</label>
            <input
              type="file"
              accept="image/*"
              className="bg-blue-300 p-3 w-auto hover:bg-cyan-100 hover:cursor-pointer"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImageFile(e.target.files[0]);
                }
              }}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-400 hover:bg-indigo-700 text-white py-2 px-4 rounded "
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default VehicleAddForm;
