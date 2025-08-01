import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { auth, db } from "@/firebase/config";

import { useNavigate, useParams } from "react-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { toast, ToastContainer } from "react-toastify";
import type { Booking, VehiclesData } from "@/types/Typescript";

function PassengerForm() {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [vehicleInfo, setVehicleInfo] = useState<VehiclesData | null>(
    null
  );

  const [formData, setFormData] = useState<Booking>({
    pickupLocation: "",
    dropLocation: "",
    pickupDate: "",
    pickupTime: "",
    numberofPassengers: undefined,
  });

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      if (!vehicleId) return;

      try {
        const docRef = doc(db, "vehicles", vehicleId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setVehicleInfo(docSnap.data() as VehiclesData) ;
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser!;

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
        numberofPassengers: formData.numberofPassengers,
        createdAt: serverTimestamp(),
      });

      toast.success("Successfully Book");

      navigate("/phome");
    } catch (error) {
      toast.error("Booking failed");
    }
  };

  return (
    <div className=" min-h-screen  flex items-center justify-center bg-cyan-600 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded shadow-md h-auto p-6 mt-18 ">
        <h2 className="text-2xl mb-4 text-center text-indigo-900">
          Add New Bookings
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {vehicleInfo && (
            <div className="bg-blue-400 p-4 rounded mb-4 text-center">
              <p>
                <strong>Vehicle Name:</strong> {vehicleInfo.type}
              </p>
              <p>
                <strong>Seats:</strong> {vehicleInfo.seats}
              </p>
              <p>
                <strong>Fees:</strong> Rs. {vehicleInfo.fees}
              </p>
            </div>
          )}

          <input
            type="text"
            name="pickupLocation"
            placeholder="Pickup Location"
            value={formData.pickupLocation}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded block"
          />

          <input
            type="text"
            name="dropLocation"
            placeholder="drop Location"
            value={formData.dropLocation}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded block"
          />

          <input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded block"
          />

          <input
            type="time"
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded block"
          />

          <input
            type="number"
            name="numberofPassengers"
            placeholder="Number Of Passengers"
            value={formData.numberofPassengers}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded block"
          />
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-indigo-400 hover:bg-indigo-700 text-white py-2 px-4 rounded hover:cursor-pointer "
            >
              Add Booking
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PassengerForm;
