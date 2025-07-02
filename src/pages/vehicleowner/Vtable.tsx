import { useEffect, useState } from "react";

import { db } from "@/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import type { Vehicles } from "@/types/Typescript";

function Vtable() {
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicles | null>(null);
  useEffect(() => {
    const fetchVehicles = async () => {
      const user = JSON.parse(localStorage.getItem("user")!);

      if (user) {
        const q = query(
          collection(db, "vehicles"),
          where("ownerId", "==", user.uid)
        );

        const snapshot = await getDocs(q);
        const list: Vehicles[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as Vehicles);
        });

        setVehicles(list);
      }
    };

    fetchVehicles();
  }, []);
  return (
    <>
      <div className="  w-full h-full shadow-md rounded-xl  ">
        <table className="w-full text-left table-auto min-w-max bg-blue-400">
          <thead className="">
            <tr>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-lg antialiased font-bold leading-none  opacity-70">
                  VehicleId
                </p>
              </th>

              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-lg antialiased font-bold leading-none  opacity-70">
                  Model
                </p>
              </th>

              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-lg antialiased font-bold leading-none  opacity-70">
                  seats
                </p>
              </th>

              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-lg antialiased font-bold leading-none  opacity-70">
                  type
                </p>
              </th>

              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-lg antialiased font-bold leading-none  opacity-70">
                  LicensePlate
                </p>
              </th>

              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-lg antialiased font-bold leading-none  opacity-70">
                  Fees
                </p>
              </th>

              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-lg antialiased font-bold leading-none  opacity-70">
                  Available
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="text-center px-4 py-6 bg-white text-gray-600"
                >
                  No vehicles found
                </td>
              </tr>
            ) : (
              vehicles.map((vehicles, index) => (
                <tr key={vehicles.id} className="text-left ">
                  <td className="px-4 py-2 bg-white">{index + 1}</td>
                  <td className="px-4 py-2 bg-white">{vehicles.model}</td>
                  <td className="px-4 py-2 bg-white">{vehicles.seats}</td>
                  <td className="px-4 py-2 bg-white">{vehicles.type}</td>
                  <td className="px-4 py-2 bg-white">
                    {vehicles.licensePlate}
                  </td>
                  <td className="px-4 py-2  bg-white">{vehicles.fees}</td>
                  <td className="px-4 py-2  bg-white">
                    {vehicles.available ? "yes" : "No"}
                  </td>

                  <td
                    className="px-4 py-2 bg-white hover:underline hover:cursor-pointer"
                    onClick={() => setSelectedVehicle(vehicles)}
                  >
                    view
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedVehicle && (
        <div className=" flex justify-center items-center bg-black fixed inset-0 px-4">
          <div className="bg-white rounded-lg max-w-xl w-full p-6 relative shadow-lg ">
            <button
              onClick={() => setSelectedVehicle(null)}
              className="absolute top-0 right-1 text-blue-900 hover:text-red-600 text-xl font-bold "
            >
              X
            </button>

            <h2 className="text-3xl font-bold text-blue-950 text-center mb-12">
              Vehicle Details
            </h2>

            <div className="space-y-6 text-gray-600 rounded-2xl  ">
              <div className="grid grid-cols-2 gap-4 text-base">
                <p>
                  <strong>Model:</strong> {selectedVehicle.model}
                </p>
                <p>
                  <strong>Seats:</strong> {selectedVehicle.seats}
                </p>
                <p>
                  <strong>Type:</strong> {selectedVehicle.type}
                </p>
                <p>
                  <strong>License Plate:</strong> {selectedVehicle.licensePlate}
                </p>
                <p>
                  <strong>Fees:</strong> Rs. {selectedVehicle.fees}
                </p>
                <p>
                  <strong>Available:</strong>{" "}
                  {selectedVehicle.available ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex justify-center mt-5">
                {selectedVehicle.images && selectedVehicle.images.length > 0 ? (
                  <img
                    src={selectedVehicle.images[0]}
                    alt="image"
                    className="w-auto h-60 rounded-md object-cover flex "
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Vtable;
