import React, { useEffect, useState } from "react";

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
    <div className="p-4 overflow-x-auto w-full">
      <h2 className="text-2xl mb-4 text-center text-indigo-900">My Bookings</h2>
      <table className="min-w-[900px] w-full border border-black">
        <thead className="bg-gray-200">
          <tr className="text-left border border-black">
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">Pickup Location</th>
            <th className="px-4 py-2">Drop Location</th>
            <th className="px-4 py-2">Pickup Date</th>
            <th className="px-4 py-2">Pickup Time</th>
            <th className="px-4 py-2">Passengers</th>
            <th className="px-4 py-2">Vehicle ID</th>
        
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
