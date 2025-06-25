import React, { useState } from "react";
import { db, auth } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";


function VehicleAddForm() {
  const [formData, setFormData] = useState({
    model: "",
    seats: "",
    type: "",
    licensePlate: "",
    fees: "",
    available: false,
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      toast.error("User not logged in!");
      return;
    }

    try {
      await addDoc(collection(db, "vehicles"), {
        ...formData,
        seats: Number(formData.seats),
        fees: Number(formData.fees),
        ownerId: user.uid,
        ownerEmail: user.email,
      });
      toast.success("Vehicle added successfully!");
      setTimeout(() => {
        navigate("/vhome");
      }, 2000);
    } catch (error) {
      console.error("Error adding vehicle:", error);
      toast.error("Failed to add vehicle.");
    }
  };

  return (
    <div className=" min-h-screen w-full flex items-center justify-center bg-cyan-800 px-4">
      <div className=" w-full bg-white  shadow-md rounded max-w-xl h-auto p-6 ">
        <h2 className="text-2xl mt-4 text-center text-indigo-700/50">
          Add New Vehicle
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="model"
            placeholder="Vehicle Model"
            value={formData.model}
            onChange={handleChange}
            className="w-full border p-2 rounded block"
            required
          />
          <input
            type="number"
            name="seats"
            placeholder="Number of Seats"
            value={formData.seats}
            onChange={handleChange}
            className="w-full border p-2 rounded block"
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Vehicle Type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border p-2 rounded block"
            required
          />
          <input
            type="text"
            name="licensePlate"
            placeholder="License Plate"
            value={formData.licensePlate}
            onChange={handleChange}
            className="w-full border p-2 rounded block"
            required
          />
          <input
            type="number"
            name="fees"
            placeholder="Rental Fee"
            value={formData.fees}
            onChange={handleChange}
            className="w-full border p-2 rounded block"
            required
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            Available
          </label>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded w-full"
          >
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
}

export default VehicleAddForm;
