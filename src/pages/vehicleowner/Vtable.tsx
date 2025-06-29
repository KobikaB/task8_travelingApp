import { useEffect, useState } from "react";

import { db } from "@/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import type { Vehicles } from "@/types/Typescript";
import { Link } from "react-router";

function Vtable() {
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
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
    <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border ">
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

              <td className="px-4 py-2 bg-white">
                Edit
              </td>

              <td className="px-4 py-2 bg-white">
              view
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Vtable;
