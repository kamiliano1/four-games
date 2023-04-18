import Image from "next/image";
import React from "react";
import playerVsPlayer from "../../../../public/images/player-vs-player.svg";
// import playerVsPlayer from "../../../../";
import { authModalState } from "../../../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { gameState } from "../../../atoms/gameAtom";

const PlayVsPlayerButton: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const [gameStates, setGameStates] = useRecoilState(gameState);
  const startGame = () => {
    setModalState((prev) => ({ ...prev, open: false }));
    setGameStates((prev) => ({ ...prev, isPaused: false }));
  };
  return (
    <button
      onClick={startGame}
      className={` text-700 mb-7 
        px-3 uppercase flex items-center rounded-[20px] 
        py-[10.34px] font-bold justify-between bg-yellow text-black
        border-[3px] border-black hover:border-darkPurple 
        shadow-normalBig hover:shadow-hoverBig`}
    >
      Play vs Player
      <Image src={playerVsPlayer} alt="" />
    </button>
  );
};
export default PlayVsPlayerButton;
