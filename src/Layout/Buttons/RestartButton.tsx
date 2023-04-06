import React from "react";

type RestartButtonProps = {};

const RestartButton: React.FC<RestartButtonProps> = () => {
  return (
    <button className="uppercase py-[.625rem] w-[108px] bg-darkPurple hover:bg-red text-500 text-white font-bold rounded-[20px]">
      Restart
    </button>
  );
};
export default RestartButton;
