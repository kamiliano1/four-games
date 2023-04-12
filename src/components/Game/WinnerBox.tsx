import PlayAgainButton from "@/src/Layout/Buttons/PlayAgainButton";
import React from "react";

type WinnerBoxProps = { winnerName: string };

const WinnerBox: React.FC<WinnerBoxProps> = ({ winnerName }) => {
  return (
    <div
      className="w-[285px] mx-auto -mt-5 font-bold 
    uppercase bg-white shadow-normalBig border-[3px] py-4 
    rounded-[20px] border-black  text-center"
    >
      <h2 className="text-500">{winnerName}</h2>
      <p className="opacity-100 text-900 ">Wins</p>
      <PlayAgainButton />
    </div>
  );
};
export default WinnerBox;
