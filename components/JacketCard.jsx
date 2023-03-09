import Image from "next/legacy/image";
import React from "react";

const JacketCard = ({ id, setSelectedJacket, selectedJacket }) => {
  return selectedJacket != id ? (
    <div className="  p-1 flex items-center justify-center">
      {" "}
      <div
        onClick={() => setSelectedJacket(id)}
        className="bg-[#CCCCCC] w-[45px] h-[45px] relative cursor-pointer transition-all transform hover:scale-105"
      >
        <Image
          src={`/jacket.png`}
          alt=""
          layout="fill"
          className="object-contain"
        />
      </div>
    </div>
  ) : (
    <div className="border-blue-500 border p-1 flex items-center justify-center">
      <div
        onClick={() => setSelectedJacket(id)}
        className="bg-[#CCCCCC] w-[45px] h-[45px] relative cursor-pointer transition-all transform hover:scale-105"
      >
        <Image
          src={`/jacket.png`}
          alt=""
          layout="fill"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default JacketCard;
