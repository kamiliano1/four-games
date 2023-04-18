import React from "react";
import playerOneAvatar from "../../../public/images/player-one.svg";
import playerTwoAvatar from "../../../public/images/player-two.svg";
import Image from "next/image";
type PlayerScoreProps = {
  name: string;
  score: number;
  playerId: number;
};

const PlayerScore: React.FC<PlayerScoreProps> = ({ name, score, playerId }) => {
  const playerAvatar: string =
    playerId === 1 ? playerOneAvatar : playerTwoAvatar;
  return (
    <div
      className="relative flex flex-col lg:p-0 lg:justify-center sm:px-[2.5rem]
      w-[145px] sm:w-[270px] lg:w-[141px] 
      sm:justify-between 
      sm:py-3 lg:py-9 sm:flex-row lg:flex-col sm:items-center my-12 sm:my-8
    py-[.625rem] border-[3px] border-black text-center bg-white rounded-[20px] 
    font-bold shadow-normalBig"
    >
      <h2
        className={`uppercase text-500 sm:text-600 ${
          playerId === 1 ? "sm:order-[-2]" : "sm:order-10"
        } lg:order-[-2]`}
      >
        {name}
      </h2>
      <p className="text-800 sm:text-900 text-black opacity-100">{score}</p>
      <Image
        src={playerAvatar}
        alt=""
        className={`absolute ${
          playerId === 1
            ? "left-[-27px] lg:left-[calc(50%-27px)] lg:right-0 lg:top-[-27px]"
            : "right-[-27px] lg:left-[calc(50%-27px)] lg:right-0 lg:top-[-27px]"
        }`}
      />
    </div>
  );
};
export default PlayerScore;
