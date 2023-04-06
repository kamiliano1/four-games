import React from "react";
import logo from "../../../public/images/logo.svg";
import MenuButton from "@/src/Layout/Buttons/MenuButton";
import RestartButton from "@/src/Layout/Buttons/RestartButton";
import Image from "next/image";
import PlayerScore from "./PlayerScore";
import frontBoardLayer from "../../../public/images/board-layer-white-small.svg";
import backBoardLayer from "../../../public/images/board-layer-black-small.svg";
type GameProps = {};

const Game: React.FC<GameProps> = () => {
  return (
    <div className="px-5 py-14">
      <div className="flex items-center justify-between">
        <MenuButton />
        <Image src={logo} alt="web logo" />
        <RestartButton />
      </div>
      <div className="flex justify-between">
        <PlayerScore name="Player 1" playerId={1} score={12} />
        <PlayerScore name="Player 2" playerId={2} score={23} />
      </div>
      <div className="relative flex justify-center">
        <Image
          src={frontBoardLayer}
          alt="game board"
          className="absolute z-10"
        />
        <Image src={backBoardLayer} alt="game board" className="absolute" />
      </div>
    </div>
  );
};
export default Game;
