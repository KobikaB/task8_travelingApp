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
      <div className="  w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl  ">
        <table className="w-full text-left table-auto min-w-max">
          <thead className="">
            <tr>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  VehicleId
                </p>
              </th>

              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Model
                </p>
              </th>

              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  seats
                </p>
              </th>

              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  type
                </p>
              </th>

              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  LicensePlate
                </p>
              </th>

              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Fees
                </p>
              </th>

              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Available
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicles, index) => (
              <tr key={vehicles.id} className="text-left ">
                <td className="px-4 py-2 bg-white">{index + 1}</td>
                <td className="px-4 py-2 bg-white">{vehicles.model}</td>
                <td className="px-4 py-2  bg-white">{vehicles.seats}</td>
                <td className="px-4 py-2  bg-white">{vehicles.type}</td>
                <td className="px-4 py-2  bg-white">{vehicles.licensePlate}</td>
                <td className="px-4 py-2  bg-white">{vehicles.fees}</td>
                <td className="px-4 py-2  bg-white">
                  {vehicles.available ? "yes" : "No"}
                </td>

                <td className="px-4 py-2 bg-white">Edit</td>

                <td
                  className="px-4 py-2 bg-white hover:underline hover:cursor-pointer"
                  onClick={() => setSelectedVehicle(vehicles)}
                >
                  view
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedVehicle && (
        <div className="bg-gray-200 flex justify-center items-center fixed inset-0 ">
          <div className="bg-white rounded-lg max-w-xl w-full p-6 relative shadow-lg mt-20">
            <button
              onClick={() => setSelectedVehicle(null)}
              className="absolute top-0 right-1 text-blue-900 hover:text-red-600 text-xl font-bold "
              
            >
              X
            </button>

            <h2 className="text-3xl font-bold text-blue-950 mb-12">
              Vehicle Details
            </h2>

            <div className="space-y-2 text-gray-600 rounded-2xl  ">
              <h3>Vehicle Id: {selectedVehicle.id}</h3>
              <h3>Model: {selectedVehicle.model} </h3>
              <h3>Seats: {selectedVehicle.seats}</h3>
              <h3>type:{selectedVehicle.type}</h3>
              <h3>LicensePlate: {selectedVehicle.licensePlate}</h3>
              <h3>Fees:{selectedVehicle.fees}</h3>
              <h3>Available:{selectedVehicle.available ? "Yes" : "No"}</h3>

              {selectedVehicle.images ? (
                <img
                  src={selectedVehicle.images}
                  alt="image"
                  className=" justify-center object-cover"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Vtable;
