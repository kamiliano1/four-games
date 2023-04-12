import Image from "next/image";
import PlayerScore from "./PlayerScore";
import frontBoardLayer from "../../../public/images/board-layer-white-small.svg";
import backBoardLayer from "../../../public/images/board-layer-black-small.svg";
import turnBackgroundRed from "../../../public/images/turn-background-red.svg";
import turnBackgroundYellow from "../../../public/images/turn-background-yellow.svg";
import { gameState } from "../../atoms/gameAtom";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
type PlayerYellowTurnBoxProps = {};

const PlayerYellowTurnBox: React.FC<PlayerYellowTurnBoxProps> = () => {
  const [gameStates, setGameStates] = useRecoilState(gameState);
  useEffect(() => {
    const timer = setTimeout(() => {
      setGameStates((prev) => ({
        ...prev,
        yellowPlayerRemainingTime: prev.yellowPlayerRemainingTime - 1,
      }));
      // setCurrentTime((prev) => prev - 1);
      // setIsTimeRunning(true);
    }, 100);
    if (gameStates.yellowPlayerRemainingTime <= 0 || gameStates.isPaused)
      clearTimeout(timer);
    return () => clearTimeout(timer);
  }, [
    gameStates.yellowPlayerRemainingTime,
    gameStates.isPaused,
    setGameStates,
  ]);
  return (
    <div className="flex justify-center mt-3 sm:mt-2 lg:-mt-4">
      <div className="relative text-black text-center font-bold w-[191px] z-20">
        <Image
          src={turnBackgroundYellow}
          className="w-[191px] h-[150px] absolute z-[-1]"
          alt=""
        />
        <h2 className="text-500 uppercase pt-[2.3rem]">Player 2`s turn</h2>
        <p className="opacity-100 text-900">
          {gameStates.yellowPlayerRemainingTime}s
        </p>
      </div>
    </div>
  );
};
export default PlayerYellowTurnBox;
