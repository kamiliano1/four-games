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
        playerId === 1 ? "ml-[13px]" : "mr-[13px]"
      } relative flex flex-col px-[2rem] my-12
    py-[.625rem] border-[3px] border-black text-center bg-white rounded-[20px] 
    font-bold shadow-normalBig`}>
      <h2 className="uppercase text-500">{name}</h2>
      <p className="text-800 text-black opacity-100">{score}</p>
      <Image
        src={playerAvatar}
        alt=""
        className={`absolute ${playerId === 1 ? "left" : "right"}-[-27px]`}
      />
    </div>
  );
};
export default PlayerScore;
