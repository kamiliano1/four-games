import React from "react";

type QuitGameButtonProps = {};

const QuitGameButton: React.FC<QuitGameButtonProps> = () => {
  return (
    <button
      className={`uppercase rounded-[20px] text-700
        mb-7 px-3 font-bold justify-between py-[1.3335rem]
       bg-red text-white border-[3px]
         border-black hover:border-darkPurple shadow-normalBig hover:shadow-hoverBig`}>
      Quit Game
    </button>
  );
};
export default QuitGameButton;
