import React from "react";
import useReset from "../../hooks/useReset";
const RestartButtonSmall: React.FC = () => {
  const { resetGame } = useReset("start over");

  return (
    <button
      onClick={resetGame}
      className="uppercase py-[.625rem] px-[20.916px] bg-darkPurple hover:bg-red text-500 text-white font-bold rounded-[20px]"
    >
      Restart
    </button>
  );
};
export default RestartButtonSmall;
