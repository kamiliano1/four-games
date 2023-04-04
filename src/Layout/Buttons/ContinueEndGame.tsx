import React from "react";
type ContinueEndGameProps = {
  type: "ContinueGame" | "QuitGame";
};

const ContinueEndGame: React.FC<ContinueEndGameProps> = ({ type }) => {
  const text = type === "ContinueGame" ? "Continue Game" : "Quit Game";
  // const buttonIcon = type === "ContinueGame" ? playerVsCPU : playerVsPlayer;
  const buttonBackground = type === "ContinueGame" ? "bg-white" : "bg-red";
  const textColor = type === "ContinueGame" ? "text-black" : "text-white";

  return (
    <>
      <button
        className={`uppercase rounded-[20px] 
        p-5 font-bold w-[300px] justify-between 
        ${buttonBackground} ${textColor} border-[3px]
         border-black hover:border-darkPurple shadow-normalBig hover:shadow-hoverBig`}
      >
        {text}
      </button>
    </>
  );
};
export default ContinueEndGame;
