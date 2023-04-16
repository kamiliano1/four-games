import GameRulesButton from "@/src/Layout/Buttons/GameRulesButton";
import PlayVsPlayer from "@/src/Layout/Buttons/PlayVsPlayerButton";
import Image from "next/image";
import React from "react";
import logo from "../../../public/images/logo.svg";

const StartModal: React.FC = () => {
  return (
    <div className="bg-purple w-full sm:bg-darkPurple h-[100vh] sm:flex">
      <div
        className=" bg-purple flex flex-col justify-center h-[100vh] px-5 sm:px-10 sm:pt-[4.375rem] sm:pb-8  max-w-[480px]
       m-auto sm:shadow-normalBig sm:w-[480px] sm:rounded-[40px] sm:h-auto sm:border-[3px] sm:border-black"
      >
        <Image src={logo} alt="web logo" className="mx-auto mb-20" />
        {/* <PlayVsCPUButton /> */}
        <PlayVsPlayer />
        {/* <PlayVersus type="vsPlayer" /> */}
        {/* <PlayVersus type="vsCPU" /> */}
        <GameRulesButton />
      </div>
    </div>
  );
};
export default StartModal;
