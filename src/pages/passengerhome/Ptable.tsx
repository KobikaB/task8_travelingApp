import { useEffect, useState } from "react";

import { db, auth } from "@/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import type { Booking } from "@/types/Typescript";



function Ptable() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(db, "bookings"),
          where("passengerId", "==", user.uid)
        );

        const snapshot = await getDocs(q);
        const list:any[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setBookings(list);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border ">
     
      <table className="w-full text-left table-auto min-w-max">
        <thead className="bg-gray-200">
          <tr >
             <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Id
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Pickup Location
              </p>
            </th><th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Drop Location
              </p>
            </th><th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Pickup Date
              </p>
            </th><th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Pickup Time
              </p>
            </th><th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Passengers
              </p>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
             Vehicle ID
              </p>
            </th>
            
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking.id} className="text-left">
              <td className="px-4 py-2 bg-white">{index + 1}</td>
              <td className="px-4 py-2 bg-white">{booking.pickupLocation}</td>
              <td className="px-4 py-2 bg-white">{booking.dropLocation}</td>
              <td className="px-4 py-2 bg-white">{booking.pickupDate}</td>
              <td className="px-4 py-2 bg-white">{booking.pickupTime}</td>
              <td className="px-4 py-2 bg-white">{booking.numberofPassengers}</td>
              <td className="px-4 py-2 bg-white">{booking.vehicleId}</td>
             
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  );
}

export default Ptable;
