import React, { useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import type { Booking } from "@/types/Typescript";

function PassengerForm() {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
   const [vehicleInfo, setVehicleInfo] = useState(null);

  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropLocation: "",
    pickupDate: "",
    pickupTime: "",
    numberofPassengers: 1,
  });


  useEffect(() => {
    const fetchVehicleDetails = async () => {
      if (!vehicleId) return;

      try {
        const docRef = doc(db, "vehicles", vehicleId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setVehicleInfo(docSnap.data());
        } else {
          toast.error("Vehicle not found");
        }
      } catch (error) {
        console.error("Error fetching vehicle:", error);
        toast.error("Failed to load vehicle data");
      }
    };

    fetchVehicleDetails(); 
}, [vehicleId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      return toast.error("you must logged In");
    }

    if (!vehicleId) {
      return toast.error("vehicle id missing");
    }

    try {
      await addDoc(collection(db, "bookings"), {
        ...formData,
        vehicleId,
        passengerId: user.uid,
       
        pickupLocation: formData.pickupLocation,
        dropLocation: formData.dropLocation,
        pickupDate: formData.pickupDate,
        pickupTime: formData.pickupTime,
        numberofPassengers: Number(formData.numberofPassengers),
        passengerName: user.displayName || "",
       
      });

      toast.success("Successfully Book");
      setTimeout(() => {
        navigate("/phome");
      }, 2000);
    } catch (error) {
      toast.error("Booking failed");
    }
  };

  return (
  <div className="min-h-screen w-full flex items-center justify-center bg-cyan-600 px-4">
   <div className="w-full max-w-xl bg-white rounded shadow-md h-auto p-6 ">

    <h2 className="text-2xl mb-4 text-center text-indigo-900">
        Add New Bookings
    </h2>


    <form onSubmit={handleSubmit} className="space-y-4">

 
<input
  type="text"
  name="pickupLocation"
  placeholder="Pickup Location"
  value={formData.pickupLocation}
  onChange={handleChange}
  required
  className="w-full border p-2 rounded"
/>

<input
  type="text"
  name="dropLocation"
  placeholder="drop Location"
  value={formData.dropLocation}
  onChange={handleChange}
  required
  className="w-full border p-2 rounded"
/>


<input
  type="date"
  name="pickupDate"
  value={formData.pickupDate}
  onChange={handleChange}
  required
  className="w-full border p-2 rounded"
/>


<input
  type="time"
  name="pickupTime"
  value={formData.pickupTime}
  onChange={handleChange}
  required
  className="w-full border p-2 rounded"
/>

<input
  type="number"
  name="numberofPassengers"
  min={1}
  value={formData.numberofPassengers}
  onChange={handleChange}
  required
  className="w-full border p-2 rounded"
/>
  <div className="flex justify-center mt-5">
  <button
            type="submit"
            className="bg-indigo-400 hover:bg-indigo-700 text-white py-2 px-4 rounded  "
          >
            Add Booking
          </button>
   </div>
        



    </form>

   
   </div>
<ToastContainer />

  </div>
)}

export default PassengerForm;
