import { useEffect, useState } from "react";
import vh from "@/images/vehicleH2.jpg";
import { auth, db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";

import { useNavigate } from "react-router";
import Vtable from "./Vtable";

function VehicleOwnerHome() {
  const navigate = useNavigate();

  const [fname, setFname] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "vowners", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFname(docSnap.data().Fname);
        }
      }
    };

    fetchUserName();
  }, []);
  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      <img src={vh} alt="bgI" className="absolute inset-0 w-full h-full object-cover " />
      <div className="relative  flex flex-col items-center px-4 pt-20 pb-10">
        <div className="text-white text-2xl  md:text-3xl font-extrabold mb-4  p-4 rounded-2xl bg-gradient-to-l from-cyan-700 via-cyan-600 mt-10 text-center">
          <h1>Welcome {fname}! </h1>
          <h2>
          
            Your vehicles, your business. Manage your rides, track bookings.
          </h2>

          <h3> Start managing, stay in control, and drive success forward!</h3>
        </div>
        {/* <Button
          variant="outline"
          className="text-2xl hover:cursor-pointer m-5 text-white bg-indigo-800/60 p-8 w-auto hover:bg-indigo-700"
          onClick={() => navigate("/allvehicle")}
        >
          View More Details
        </Button> */}

        <div>
          <button
            onClick={() => navigate("/addvehicle")}
            className=" bg-gray-400 text-white text-xl rounded hover:bg-gray-500 p-4 mb-10 "
          >
            Add Vehicle
          </button>
        </div>

        <div className=" w-full bg-white/90 rounded-lg p-4 mt-6  overflow-x-auto overflow-y-auto ">
          <Vtable />
        </div>
      </div>
    </div>
  );
}

export default VehicleOwnerHome;
