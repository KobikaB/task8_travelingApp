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
        const vehicleList = snapshot.docs.map(doc => ({
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
    <div>
      <h2>Available Vehicles</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {vehicles.map(vehicle => (
          <div
            key={vehicle.id}
            onClick={() => navigate(`/passenger/book/${vehicle.id}`)}
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 10,
              width: 250,
            }}
          >
            <h3>{vehicle.name}</h3>
            <p>Seats: {vehicle.seats}</p>
            <p>Fees: Rs.{vehicle.fees}</p>
            <div>
              {vehicle.images && vehicle.images.length > 0 ? (
                vehicle.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${vehicle.name}-${idx}`}
                    width={220}
                    style={{ marginBottom: 10, borderRadius: 6 }}
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
