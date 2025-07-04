import  { useEffect, useState } from "react";

// import homepageI1 from "@/images/homepageI1.jpeg";
import { auth, db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import {  useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

import Ptable from "./Ptable";

function PassengerHome() {
  const [fname, setFname] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      
      if (user) {
        const docRef = doc(db, "passengers", user.uid);
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
      <img
        src="https://res.cloudinary.com/dq5buemig/image/upload/v1751567755/no4gj5peshgbrmyyzzns.png"
        alt="bgI"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="relative flex flex-col items-center px-4 ">
        <div className=" text-white text-2xl  md:text-3xl font-extrabold mb-4 text-center bg-blue-500 p-4 rounded-2xl bg-gradient-to-l from-cyan-400 via-cyan-600 mt-40 ">
          <h1 className="text-blue-900">welcome to {fname}!</h1> 
          <h2>abroad let's get moving! adventure starts here!</h2>
         <h2>your journey awaits! ready to explore? travel made easy!</h2>
          <h2>hop in, let's go! begin your trip! discover new destinations!
          your ride, your way!</h2>
        </div>

        <Button
          variant="outline"
          className="text-2xl hover:cursor-pointer m-5 text-white bg-indigo-500/60 p-8 w-auto hover:bg-indigo-700/60"
       onClick={() => navigate("/allvehicle")} 
         
        >
          add Booking 
        </Button>


        <div className="w-full bg-white/90 rounded-lg p-4 mt-6  overflow-x-auto overflow-y-auto">
          <Ptable />
        </div>

        {/* <img
          src={homepageI1}
          alt="logo"
          className="h-12 sm:h-13 md:h-50 lg:h-60  bg-amber-200   "
        /> */}
      </div>
    </div>
  );
}

export default PassengerHome;
