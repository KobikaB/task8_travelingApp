import { useEffect, useState } from "react";

import { db, auth } from "@/firebase/config";
import { collection, query, where, getDocs} from "firebase/firestore";
import type { Booking } from "@/types/Typescript";

function Ptable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(db, "bookings"),
          where("passengerId", "==", user.uid)
        );
        try {
          const snapshot = await getDocs(q);
          const list: any[] = [];
          snapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });

          list.sort((a, b) => {
  const dateTimeA = new Date(`${a.pickupDate}T${a.pickupTime}`);
  const dateTimeB = new Date(`${b.pickupDate}T${b.pickupTime}`);
  return dateTimeA.getTime() - dateTimeB.getTime();
});

          setBookings(list);
        } catch (error) {
          toast.error("Error for fetching Books");
        }
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  if(loading){
   return <p className="text-center text-2xl text-emerald-500">Loading datas.....</p>
  }

  

  return (
    <div className="w-full h-full rounded-xl shadow-md ">
      <table className="w-full text-left table-auto min-w-max bg-blue-400 ">
        <thead className=" bg-cyan-600 ">
          <tr>
            <th className="p-4">Id</th>
            <th className="p-4">Pickup Location</th>
            <th className="p-4">Drop Location</th>
            <th className="p-4">Pickup Date</th>
            <th className="p-4">Pickup Time</th>
            <th className="p-4">Passengers</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <tr key={booking.id} className="text-left">
                <td className="px-4 py-2 bg-white">{index + 1}</td>
                <td className="px-4 py-2 bg-white">{booking.pickupLocation}</td>
                <td className="px-4 py-2 bg-white">{booking.dropLocation}</td>
                <td className="px-4 py-2 bg-white">{booking.pickupDate}</td>
                <td className="px-4 py-2 bg-white">{booking.pickupTime}</td>
                <td className="px-4 py-2 bg-white">
                  {booking.numberofPassengers}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="text-center px-4 py-6 bg-white text-xl text-gray-600"
              >
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Ptable;
