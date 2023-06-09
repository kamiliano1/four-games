import React from "react";
import { authModalState } from "../../../atoms/modalAtom";
import { useRecoilState } from "recoil";
import useReset from "@/src/hooks/useReset";
const QuitGameButton: React.FC = () => {
  const { resetGame } = useReset("start over");
  const [modalState, setModalState] = useRecoilState(authModalState);
  const quitGame = () => {
    setModalState((prev) => ({ ...prev, open: true, view: "start" }));
    resetGame();
  };
  return (
    <button
      onClick={quitGame}
      className={`uppercase rounded-[20px] text-700
        mb-7 px-3 font-bold justify-between py-[1.3335rem]
       bg-red text-white border-[3px]
         border-black hover:border-darkPurple shadow-normalBig hover:shadow-hoverBig`}
    >
      Quit Game
    </button>
  );
};
export default QuitGameButton;
