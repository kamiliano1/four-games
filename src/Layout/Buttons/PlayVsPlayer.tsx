import Image from "next/image";
import React from "react";
import playerVsPlayer from "../../../public/images/player-vs-player.svg";
type PlayVsPlayerProps = {};

const PlayVsPlayer: React.FC<PlayVsPlayerProps> = () => {
  return (
    <button
      className={` text-700 mb-7 
        px-3 uppercase flex items-center rounded-[20px] 
        py-[10.34px] font-bold justify-between bg-yellow text-black
        border-[3px] border-black hover:border-darkPurple 
        shadow-normalBig hover:shadow-hoverBig`}>
      Play vs Player
      <Image src={playerVsPlayer} alt="" />
    </button>
  );
};
export default PlayVsPlayer;
