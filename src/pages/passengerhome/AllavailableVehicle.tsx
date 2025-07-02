import { useEffect, useState } from "react";
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
  type: string;
}

const AllAvailableVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

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
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className="bg-gradient-to-r from-cyan-900 via-cyan-500 min-h-screen p-4 ">
      <h2 className="flex justify-center text-2xl font-extrabold p-6  ">
        Available Vehicles
      </h2>
      <div className="flex flex-wrap gap-20  justify-center ">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => navigate(`/passenger/book/${vehicle.id}`)}
            className="w-80 bg-white  rounded-lg shadow-xl hover:cursor-pointer transform transition duration-400 hover:scale-105  flex flex-col items-center  p-4 "
          >
            <div className="mb-5" >
              <p>Name: {vehicle.type}</p>
              <p>Seats: {vehicle.seats}</p>
              <p>Fees: Rs.{vehicle.fees}</p>
            </div>

            <div >
              {vehicle.images && vehicle.images.length > 0 ? (
                vehicle.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    className="w-40 h-40 object-cover "
                  />
                ))
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
