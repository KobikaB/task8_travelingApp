import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { db, auth } from "@/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

function Vtable() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  useEffect(() => {
    const fetchVehicles = async () => {
      const user = auth.currentUser;

      if (user) {
        const q = query(
          collection(db, "vehicles"),
          where("ownerId", "==", user.uid)
        );

        const snapshot = await getDocs(q);
        const list: any[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setVehicles(list);
      }
    };

    fetchVehicles();
  }, []);
  return (
    <div className="p-4 overflow-x-auto w-full ">
      <table className="min-w-[900px] w-full border border-black">
        <thead className="bg-gray-200">
          <tr className="text-left border border-black">
            <th className="px-4 py-2">VehicleId</th>
            <th className="px-4 py-2">Model</th>
            <th className="px-4 py-2">seats</th>
            <th className="px-4 py-2">type</th>
            <th className="px-4 py-2">LicensePlate</th>
            <th className="px-4 py-2">Fees</th>
            <th className="px-4 py-2">Available</th>

            <th className="px-4 py-2">Edit</th>
            <th className="px-4 py-2">view</th>
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
                <Link
                  to={`/edit/${vehicles.id}`}
                  className=" px-3 py-1 rounded hover:underline"
                >
                  Edit
                </Link>
              </td>

              <td className="px-4 py-2 bg-white">
                <Link
                  to={`/view/${vehicles.id}`}
                  className="bg-white hover:underline px-3 py-1 rounded"
                >
                  view
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Vtable;
