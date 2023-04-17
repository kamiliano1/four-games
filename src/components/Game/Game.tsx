import React from "react";
import { useRecoilValue } from "recoil";
import { gameState } from "../../atoms/gameAtom";
import Image from "next/image";
import MenuButton from "@/src/Layout/Buttons/MenuButton";
import RestartButton from "@/src/Layout/Buttons/RestartButtonSmall";
import logo from "../../../public/images/logo.svg";
import Board from "../Board";
import PlayerRedTurnBox from "./PlayerRedTurnBox";
import PlayerScore from "./PlayerScore";
import PlayerYellowTurnBox from "./PlayerYellowTurnBox";
import WinnerBox from "./WinnerBox";

const Game: React.FC = () => {
  const gameStates = useRecoilValue(gameState);

  return (
    <div className="grid pt-[50px] relative h-[100vh] grid-rows-[min-content,_auto]">
      <div className="px-5 sm:px-0 py-15 justify-self-center">
        <div className="">
          <div className="flex items-center justify-between sm:w-[632px] sm:mx-auto">
            <MenuButton />
            <Image src={logo} alt="web logo" />
            <RestartButton />
          </div>
          <div
            className="grid grid-rows-[150px, auto] justify-center grid-cols-2 lg:grid-rows-[584px] 
          lg:grid-cols-[141px,632px,141px] lg:gap-x-10 place-items-center lg:pt-5"
          >
            <PlayerScore
              name="Player 1"
              playerId={1}
              score={gameStates.redPlayerScore}
            />
            <PlayerScore
              name="Player 2"
              playerId={2}
              score={gameStates.yellowPlayerScore}
            />
            <Board />
          </div>
        </div>
        {gameStates.isGameOver ? (
          <WinnerBox winnerName={gameStates.winnerPlayer} />
        ) : (
          <>
            {gameStates.currentPlayerTurn === "red" ? (
              <PlayerRedTurnBox />
            ) : (
              <PlayerYellowTurnBox />
            )}
          </>
        )}
      </div>
      <div
        className={`${
          gameStates.winnerPlayer === "Player 1"
            ? "bg-red"
            : gameStates.winnerPlayer === "Player 2"
            ? "bg-yellow"
            : "bg-darkPurple"
        }  w-full  ${gameStates.isGameOver ? "-mt-[155px]" : "-mt-[106px]"}
      rounded-t-[60px] rounder-r-[60px] z-[-50]`}
      ></div>
    </div>
  );
};
export default Game;
