import ContinueEndGame from "@/src/Layout/Buttons/ContinueEndGame";
import Restart from "@/src/Layout/Buttons/Restart";
import React from "react";

type PauseModalProps = {};

const PauseModal: React.FC<PauseModalProps> = () => {
  return (
    <div className="menu flex justify-center fixed w-full h-full">
      <div
        className="bg-purple relative mx-5  flex flex-col justify-center  
            px-5 sm:px-10 pt-[1.875rem] pb-[3.8125rem] sm:pb-[3.1875rem] 
           m-auto shadow-normalBig rounded-[40px] 
           sm:h-auto border-[3px] border-black w-[480px]"
      >
        <h1 className="uppercase text-white text-center text-900 font-bold mb-[1.8125rem]">
          Pause
        </h1>
        <ContinueEndGame type="ContinueGame" />
        <Restart />
        <ContinueEndGame type="QuitGame" />
      </div>
    </div>
  );
};
export default PauseModal;