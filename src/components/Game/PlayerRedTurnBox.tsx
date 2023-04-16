import Image from "next/image";
import PlayerScore from "./PlayerScore";
import frontBoardLayer from "../../../public/images/board-layer-white-small.svg";
import backBoardLayer from "../../../public/images/board-layer-black-small.svg";
import turnBackgroundRed from "../../../public/images/turn-background-red.svg";
import turnBackgroundYellow from "../../../public/images/turn-background-yellow.svg";
import { useEffect, useState } from "react";
import { gameState } from "../../atoms/gameAtom";
import { useRecoilState } from "recoil";

type PlayerRedTurnBoxProps = {};

const PlayerRedTurnBox: React.FC<PlayerRedTurnBoxProps> = () => {
  const [gameStates, setGameStates] = useRecoilState(gameState);
  useEffect(() => {
    const timer = setTimeout(() => {
      setGameStates((prev) => ({
        ...prev,
        redPlayerRemainingTime: prev.redPlayerRemainingTime - 1,
      }));
    }, 100);
    if (gameStates.redPlayerRemainingTime <= 0 || gameStates.isPaused)
      clearTimeout(timer);
    if (gameStates.redPlayerRemainingTime === 0)
      setGameStates((prev) => ({
        ...prev,
        // yellowPlayerScore: prev.yellowPlayerScore + 1,
        isGameOver: true,
        winnerPlayer: "Player 2",
      }));
    return () => clearTimeout(timer);
  }, [gameStates.redPlayerRemainingTime, gameStates.isPaused, setGameStates]);
  return (
    <div className="flex justify-center mt-3 sm:mt-2 lg:-mt-4">
      <div className="relative text-white text-center font-bold w-[191px] z-20">
        <Image
          src={turnBackgroundRed}
          className="w-[191px] h-[150px] absolute z-[-1]"
          alt=""
        />
        <h2 className="text-500 uppercase pt-[2.3rem]">Player 1`s turn</h2>
        <p className="opacity-100 text-900">
          {gameStates.redPlayerRemainingTime}s
        </p>
      </div>
    </div>
  );
};
export default PlayerRedTurnBox;
