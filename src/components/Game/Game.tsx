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
import { useRecoilState } from "recoil";

type GameProps = {};

const Game: React.FC<GameProps> = () => {
  type picturesType = {
    front: StaticImageData;
    back: StaticImageData;
  };
  const [gameStates, setGameStates] = useRecoilState(gameState);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<picturesType>({
    front: frontBoardLayerSmall,
    back: backBoardLayerSmall,
  });
  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    windowWidth > 767
      ? setCurrentImage({
          front: frontBoardLayerLarge,
          back: backBoardLayerLarge,
        })
      : setCurrentImage({
          front: frontBoardLayerSmall,
          back: backBoardLayerSmall,
        });
  }, [windowWidth]);
  return (
    <div className=" ">
      {/* <div
        className="bg-darkPurple absolute w-full h-[236px] bottom-0 
      rounded-t-[60px] rounder-r-[60px] -z-40"
      ></div> */}
      <div className="px-5 sm:px-0 py-14">
        <div className="w-[335px] sm:w-[632px] lg:w-[1110px] mx-auto ">
          <h1 className="text-[5rem] text-center">
            {gameStates.currentPlayerTurn}
          </h1>
          <div className="flex items-center justify-between sm:w-[632px] sm:mx-auto">
            <MenuButton />
            <Image src={logo} alt="web logo" />
            <RestartButton />
          </div>
          {/* <Board /> */}
          <div className="grid grid-rows-[150px, auto] grid-cols-2 lg:grid-rows-[584px] lg:grid-cols-[auto,auto,auto] lg:gap-12 place-items-center">
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

            {/* <div className="relative flex justify-center col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-1"> */}
            <Board />
            {/* <Image
              src={currentImage.front}
              alt="game board"
              className=" z-[-4]"
            />
            <Image
              src={currentImage.back}
              alt="game board"
              className="absolute z-[-5]"
            /> */}
            {/* </div> */}
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
        {/* <WinnerBox winnerName={gameStates.winnerPlayer} /> */}
      </div>
    </div>
  );
};
export default Game;
