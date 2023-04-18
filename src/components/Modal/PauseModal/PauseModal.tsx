import ContinueGameButton from "@/src/components/Modal/PauseModal/ContinueGameButton";
import QuitGameButton from "@/src/components/Modal/PauseModal/QuitGameButton";
import RestartButtonBig from "@/src/components/Modal/PauseModal/RestartButtonBig";

import React from "react";

const PauseModal: React.FC = () => {
  return (
    <div className="menu flex justify-center fixed w-full h-full z-[9999]">
      <div
        className="z-[9999] bg-purple relative mx-5 flex flex-col justify-center  
            px-5 sm:px-10 pt-[1.875rem] pb-[3.8125rem] sm:pb-[3.1875rem] 
           m-auto shadow-normalBig rounded-[40px] 
           sm:h-auto border-[3px] border-black w-[480px] "
      >
        <h1 className="uppercase text-white text-center text-900 font-bold mb-[1.8125rem]">
          Pause
        </h1>
        <ContinueGameButton />
        <RestartButtonBig />
        <QuitGameButton />
      </div>
    </div>
  );
};
export default PauseModal;
