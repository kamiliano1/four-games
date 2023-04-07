import React from "react";

type RestartButtonBigProps = {};

const RestartButtonBig: React.FC<RestartButtonBigProps> = () => {
  return (
    <button
      className={`uppercase rounded-[20px] text-700
      mb-7 px-3 font-bold justify-between py-[1.3335rem]
      bg-white text-black border-[3px]
       border-black hover:border-darkPurple shadow-normalBig hover:shadow-hoverBig`}
    >
      Restart
    </button>
  );
};
export default RestartButtonBig;
