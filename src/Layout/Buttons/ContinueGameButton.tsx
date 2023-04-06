import React from "react";

type ContinueGameButtonProps = {};

const ContinueGameButton: React.FC<ContinueGameButtonProps> = () => {
  return (
    <button
      className={`uppercase rounded-[20px] text-700
        mb-7 px-3 font-bold justify-between py-[1.3335rem]
        bg-white text-black border-[3px]
         border-black hover:border-darkPurple shadow-normalBig hover:shadow-hoverBig`}>
      Continue Game
    </button>
  );
};
export default ContinueGameButton;
