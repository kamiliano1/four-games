import React from "react";

const Restart: React.FC = () => {
  return (
    <button
      className={`uppercase rounded-[20px] text-700 bg-white text-black
        mb-7 px-3 font-bold justify-between py-[1.3335rem]
        border-[3px]
         border-black hover:border-darkPurple shadow-normalBig hover:shadow-hoverBig`}
    >
      Restart
    </button>
  );
};
export default Restart;
