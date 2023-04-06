import React, { useEffect, useState } from "react";
import logo from "../../../public/images/logo.svg";
import MenuButton from "@/src/Layout/Buttons/MenuButton";
import RestartButton from "@/src/Layout/Buttons/RestartButton";
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
type GameProps = {};

const Game: React.FC<GameProps> = () => {
  type picturesType = {
    front: StaticImageData;
    back: StaticImageData;
  };
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
    <div className="h-full ">
      <div className="bg-darkPurple absolute w-full h-[236px] bottom-0 rounded-t-[60px] rounder-r-[60px] -z-40"></div>
      <div className="px-5 sm:px-[0] py-14">
        <div className="sm:w-[632px] mx-auto ">
          <div className="flex items-center justify-between ">
            <MenuButton />
            <Image src={logo} alt="web logo" />
            <RestartButton />
          </div>
          <div className="flex justify-between">
            <PlayerScore name="Player 1" playerId={1} score={12} />
            <PlayerScore name="Player 2" playerId={2} score={23} />
          </div>
        </div>
        <div className="relative flex justify-center ">
          <Image
            src={currentImage.front}
            alt="game board"
            className=" z-[-4]"
          />
          <Image
            src={currentImage.back}
            alt="game board"
            className="absolute z-[-5]"
          />
        </div>
        {/* <PlayerRedTurnBox /> */}
        {/* <PlayerYellowTurnBox /> */}

        <WinnerBox />
      </div>
    </div>
  );
};
export default Game;
