import React from "react";

type PlayAgainButtonProps = {};

const PlayAgainButton: React.FC<PlayAgainButtonProps> = () => {
  return (
    <button className="uppercase py-[.625rem] w-[130px] bg-darkPurple hover:bg-red text-500 text-white font-bold rounded-[20px]">
      Play Again
    </button>
  );
};
export default PlayAgainButton;
