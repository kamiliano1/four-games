import Image from "next/image";
import React from "react";
import playerVsCPU from "../../../public/images/player-vs-cpu.svg";

const PlayVsCPUButton: React.FC = () => {
  return (
    <button
      className={` text-700 mb-7 
        px-3 uppercase flex items-center rounded-[20px] 
        py-[10.34px] font-bold justify-between bg-red text-white
        border-[3px] border-black hover:border-darkPurple 
        shadow-normalBig hover:shadow-hoverBig`}
    >
      Play vs CPU
      <Image src={playerVsCPU} alt="" />
    </button>
  );
};
export default PlayVsCPUButton;
