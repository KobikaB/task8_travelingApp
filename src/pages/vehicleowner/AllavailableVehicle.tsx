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

const images = [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10];

function AllavailableVehicle() {
  const navigate = useNavigate();

  const handleImageClick = (index: number) => {
    navigate(`/booking/${index}`);
  };
  return (
    <div className="bg-cyan-500/80 p-4 ">
      <h1 className=" font-bold mb-6 text-center text-4xl mt-40 ">
        All Available vehicles
      </h1>
      <div className=" flex flex-row flex-wrap gap-10 mb-3 bg-gray-200">
        {images.map((im, index) => (
          <div key={index} onClick={() => handleImageClick(index)}>
            <img src={im} alt="vehicle" className="w-full h-60 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllavailableVehicle;
