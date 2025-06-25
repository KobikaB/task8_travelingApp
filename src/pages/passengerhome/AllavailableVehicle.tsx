import React from "react";

import i1 from "@/images/Vfull/i1.jpeg";
import i2 from "@/images/Vfull/i2.jpeg";
import i3 from "@/images/Vfull/i3.jpg";
import i4 from "@/images/Vfull/i4.jpeg";
import i5 from "@/images/Vfull/i5.jpeg";
import i6 from "@/images/Vfull/i6.jpeg";
import i7 from "@/images/Vfull/i7.jpg";
import i8 from "@/images/Vfull/i8.jpeg";
import i9 from "@/images/Vfull/i9.jpeg";
import i10 from "@/images/Vfull/i10.jpeg";
import { useNavigate } from "react-router";

const vehicles = [
  { id: "abc123", img: i1 },
  { id: "def456", img: i2 },
  { id: "ghi789", img: i3 },
  { id: "jkl012", img: i4 },
  { id: "mno345", img: i5 },
  { id: "pqr678", img: i6 },
  { id: "stu901", img: i7 },
  { id: "vwx234", img: i8 },
  { id: "yz5678", img: i9 },
  { id: "aaa999", img: i10 },
];

function AllavailableVehicle() {
  const navigate = useNavigate();

  const handleImageClick = (vehicleId:string) => {
     navigate(`/passenger/book/${vehicleId}`);
  };
  return (
    <div className="bg-cyan-500/80 p-4 ">
      <h1 className=" font-bold mb-6 text-center text-4xl mt-40 ">
        All Available vehicles
      </h1>
      <div className=" flex flex-row flex-wrap gap-10 mb-3 bg-gray-200">
        {vehicles.map((veh) => (
          <div key={veh.id} onClick={() => handleImageClick(veh.id)}>
            <img src={veh.img} alt="vehicle" className="w-full h-60 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllavailableVehicle;
