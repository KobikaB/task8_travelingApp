import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useNavigate } from "react-router";

interface Vehicle {
  id: string;
  name: string;
  fees: number;
  seats: number;
  images: string[];
  available: boolean;
}

const AllAvailableVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehicleCollection = collection(db, "vehicles");
        const snapshot = await getDocs(vehicleCollection);
        const vehicleList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Vehicle, "id">),
        }));

        console.log("Fetched vehicles:", vehicleList);

        setVehicles(vehicleList);
      } catch (error) {
        console.error("Error fetching vehicles", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) return <p>Loading vehicles...</p>;

  if (vehicles.length === 0) return <p>No vehicles found.</p>;

  return (
    <div className="bg-gradient-to-r from-cyan-900 via-cyan-500 ">
      <h2 className="flex justify-center text-2xl font-extrabold p-6 ">
        Available Vehicles
      </h2>
      <div className="flex flex-wrap gap-10  ">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => navigate(`/passenger/book/${vehicle.id}`)}
            className=" border-4 border-white bg-gray-400 text-xl font-bold  h-auto hover:cursor-pointer"
          >
            <p>Seats: {vehicle.seats}</p>
            <p>Fees: Rs.{vehicle.fees}</p>
            <div>
              {vehicle.images && vehicle.images.length > 0 ? (
                vehicle.images.map((img, idx) => <img key={idx} src={img} />)
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAvailableVehicles;
