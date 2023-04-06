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
      className={` ${
        playerId === 1 ? "ml-[13px] sm:ml-[24px]" : "mr-[13px] sm:mr-[24px]"
      } relative flex flex-col pl-[2.5rem] pr-[2rem] sm:w-[270px] sm:justify-between 
      sm:py-3 sm:flex-row sm:items-center my-12 sm:my-8
    py-[.625rem] border-[3px] border-black text-center bg-white rounded-[20px] 
    font-bold shadow-normalBig`}
    >
      <h2
        className={`uppercase text-500 ${
          playerId === 1 ? "order-[-2]" : "order-10"
        }`}
      >
        {name}
      </h2>
      <p className="text-800 sm:text-900 text-black opacity-100">{score}</p>
      <Image
        src={playerAvatar}
        alt=""
        className={`absolute ${
          playerId === 1 ? "left-[-27px]" : "right-[-27px]"
        }`}
      />
    </div>
  );
};
export default PlayerScore;
