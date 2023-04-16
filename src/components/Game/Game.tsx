import React, { useEffect, useState } from "react";
import logo from "../../../public/images/logo.svg";
import MenuButton from "@/src/Layout/Buttons/MenuButton";
import RestartButton from "@/src/Layout/Buttons/RestartButtonSmall";
import Image, { StaticImageData } from "next/image";
import PlayerScore from "./PlayerScore";
import frontBoardLayerSmall from "../../../public/images/board-layer-white-small.svg";
import backBoardLayerSmall from "../../../public/images/board-layer-black-small.svg";
import frontBoardLayerLarge from "../../../public/images/board-layer-white-large.svg";
import backBoardLayerLarge from "../../../public/images/board-layer-black-large.svg";
import turnBackgroundRed from "../../../public/images/turn-background-red.svg";
import turnBackgroundYellow from "../../../public/images/turn-background-yellow.svg";
import PlayerRedTurnBox from "./PlayerRedTurnBox";
import PlayerYellowTurnBox from "./PlayerYellowTurnBox";
import WinnerBox from "./WinnerBox";
import Board from "../Board";
import { gameState } from "../../atoms/gameAtom";
import { useRecoilValue } from "recoil";

const Game: React.FC = () => {
  const gameStates = useRecoilValue(gameState);

  return (
    <div className=" grid justify-center pt-[50px] relative h-[100vh] pb-10">
      <div
        className={`${
          gameStates.winnerPlayer === "Player 1"
            ? "bg-red"
            : gameStates.winnerPlayer === "Player 2"
            ? "bg-yellow"
            : "bg-darkPurple"
        } absolute w-full h-[30%] bottom-0 lg:-bottom-[0]
      rounded-t-[60px] rounder-r-[60px] z-[-50]`}
      ></div>
      <div className="px-5 sm:px-0 py-15  ">
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
    </div>
  );
};
export default Game;
