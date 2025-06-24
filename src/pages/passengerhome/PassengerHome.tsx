import React, { useEffect, useState } from "react";
import HomeI from "@/images/Homebg5.jpg";
import homepageI1 from "@/images/homepageI1.jpeg";
import { auth, db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";

function PassengerHome() {
  const [fname, setFname] = useState<string>("");

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
    <div className="w-full h-screen">
      <img
        src={HomeI}
        alt="bgI"
        className="min-w-full min-h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center text-ce flex-col px-4">
        <h1 className=" text-white text-2xl  md:text-3xl font-extrabold mb-4 text-center bg-blue-500 p-4 rounded-2xl bg-gradient-to-l from-cyan-400 via-cyan-600 mt-20 ">
          <span className="text-blue-900">welcome to {fname}!</span> <br />
          abroad let's get moving! adventure starts here! <br />
          your journey awaits! ready to explore? travel made easy! <br />
          hop in, let's go! begin your trip! discover new destinations! <br />
          your ride, your way!
        </h1>

        <img
          src={homepageI1}
          alt="logo"
          className="h-12 sm:h-13 md:h-50 lg:h-60  bg-amber-200   "
        />
      </div>
    </div>
  );
}

export default PassengerHome;
