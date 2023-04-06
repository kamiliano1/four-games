import AcceptButton from "@/src/Layout/Buttons/AcceptButton";
import React from "react";
type RulesModalProps = {};

const RulesModal: React.FC<RulesModalProps> = () => {
  return (
    <div className="bg-purple w-full sm:bg-darkPurple h-[100vh] flex justify-center">
      <div
        className="relative mx-5 bg-white flex flex-col justify-center  
        px-5 sm:px-10 pt-[1.875rem] pb-[3.8125rem] sm:pb-[3.1875rem] 
       m-auto shadow-normalBig rounded-[40px] 
       sm:h-auto border-[3px] border-black w-[480px]">
        <h1 className="uppercase text-center text-900 font-bold mb-[1.8125rem]">
          Rules
        </h1>
        <h2 className="uppercase text-purple font-bold text-600 mb-4">
          Objective
        </h2>
        <p className="text-500 opacity-[0.66] mb-[2.0625rem]">
          Be the first player to connect 4 of the same colored discs in a row
          (either vertically, horizontally, or diagonally).
        </p>
        <h2 className="uppercase text-purple font-bold text-600 mb-4">
          How to Play
        </h2>
        <div className="flex mb-[0.6875rem]">
          <span className="mr-[1.1875rem] font-bold">1</span>{" "}
          <p>Red goes first in the first game.</p>
        </div>
        <div className="flex mb-[0.6875rem]">
          <span className="mr-[1.1875rem] font-bold">2</span>{" "}
          <p>
            Players must alternate turns, and only one disc can be dropped in
            each turn.
          </p>
        </div>
        <div className="flex mb-[0.6875rem]">
          <span className="mr-[1.1875rem] font-bold">3</span>{" "}
          <p>The game ends when there is a 4-in-a-row or a stalemate.</p>
        </div>
        <div className="flex ">
          <span className="mr-[1.1875rem] font-bold">4</span>{" "}
          <p>The starter of the previous game goes second on the next game. </p>
        </div>
        <AcceptButton />
      </div>
    </div>
  );
};
export default RulesModal;
