import React from "react";

type RestartButtonSmallProps = {};

const RestartButtonSmall: React.FC<RestartButtonSmallProps> = () => {
  return (
    <button className="uppercase py-[.625rem] w-[108px] bg-darkPurple hover:bg-red text-500 text-white font-bold rounded-[20px]">
      Restart
    </button>
  );
};
export default RestartButtonSmall;
