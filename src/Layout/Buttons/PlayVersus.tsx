import React, { CSSProperties } from "react";
import playerVsPlayer from "../../../public/images/player-vs-player.svg";
import playerVsCPU from "../../../public/images/player-vs-cpu.svg";
import Image from "next/image";
type PlayVersusProps = {
  type: "vsPlayer" | "vsCPU";
};

const PlayVersus: React.FC<PlayVersusProps> = ({ type }) => {
  const text = type === "vsCPU" ? "Play vs CPU" : "Play vs Player";
  const buttonIcon = type === "vsCPU" ? playerVsCPU : playerVsPlayer;
  const buttonBackground = type === "vsCPU" ? "bg-red" : "bg-yellow";
  const textColor = type === "vsCPU" ? "text-white" : "text-black";

  return (
    <>
      <button
        className={` text-700 mb-7 
        px-3 uppercase flex items-center rounded-[20px] 
        py-[10.34px] font-bold justify-between ${buttonBackground} ${textColor} 
        border-[3px] border-black hover:border-darkPurple 
        shadow-normalBig hover:shadow-hoverBig`}
      >
        {text}
        <Image src={buttonIcon} alt="" />
      </button>
    </>
  );
};
export default PlayVersus;
