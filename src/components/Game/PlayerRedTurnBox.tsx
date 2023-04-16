import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import turnBackgroundRed from "../../../public/images/turn-background-red.svg";
import { gameState } from "../../atoms/gameAtom";

const PlayerRedTurnBox: React.FC = () => {
  const [gameStates, setGameStates] = useRecoilState(gameState);
  useEffect(() => {
    const timer = setTimeout(() => {
      setGameStates((prev) => ({
        ...prev,
        redPlayerRemainingTime: prev.redPlayerRemainingTime - 1,
      }));
    }, 1000);
    if (gameStates.redPlayerRemainingTime <= 0 || gameStates.isPaused)
      clearTimeout(timer);
    if (gameStates.redPlayerRemainingTime === 0)
      setGameStates((prev) => ({
        ...prev,
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
