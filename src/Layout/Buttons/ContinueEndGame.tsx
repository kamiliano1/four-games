import React from "react";
type ContinueEndGameProps = {
  type: "ContinueGame" | "QuitGame";
};

const ContinueEndGame: React.FC<ContinueEndGameProps> = ({ type }) => {
  const text = type === "ContinueGame" ? "Continue Game" : "Quit Game";
  const buttonBackground = type === "ContinueGame" ? "bg-white" : "bg-red";
  const textColor = type === "ContinueGame" ? "text-black" : "text-white";

  return (
    <button
      className={`uppercase rounded-[20px] text-700
        mb-7 px-3 font-bold justify-between py-[1.3335rem]
        ${buttonBackground} ${textColor} border-[3px]
         border-black hover:border-darkPurple shadow-normalBig hover:shadow-hoverBig`}
    >
      {text}
    </button>
  );
};
export default ContinueEndGame;
