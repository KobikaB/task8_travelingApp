import{ useEffect, useState } from "react";
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
    <div className="bg-gradient-to-r from-cyan-900 via-cyan-500  ">
      <h2 className="flex justify-center text-2xl font-extrabold p-6 ">
        Available Vehicles
      </h2>
      <div className="flex flex-wrap gap-20  ">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => navigate(`/passenger/book/${vehicle.id}`)}
            className="w-100 h-90 bg-gray-300 object-cover rounded border-2 hover:border-white "
          >
            <p>Seats: {vehicle.seats}</p>
            <p>Fees: Rs.{vehicle.fees}</p>
            <div className="">
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
