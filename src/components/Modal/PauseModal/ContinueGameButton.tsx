import React from "react";
import { authModalState } from "../../../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { gameState } from "@/src/atoms/gameAtom";

const ContinueGameButton: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [gameStates, setGameStates] = useRecoilState(gameState);
  const continueGame = () => {
    setModalState((prev) => ({ ...prev, open: false }));
    setGameStates((prev) => ({ ...prev, isPaused: false }));
  };

  return (
    <button
      onClick={continueGame}
      className={`uppercase rounded-[20px] text-700
        mb-7 px-3 font-bold justify-between py-[1.3335rem]
        bg-white text-black border-[3px]
         border-black hover:border-darkPurple shadow-normalBig hover:shadow-hoverBig`}
    >
      Continue Game
    </button>
  );
};
export default ContinueGameButton;
