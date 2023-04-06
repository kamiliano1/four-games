import Image from "next/image";
import PlayerScore from "./PlayerScore";
import frontBoardLayer from "../../../public/images/board-layer-white-small.svg";
import backBoardLayer from "../../../public/images/board-layer-black-small.svg";
import turnBackgroundRed from "../../../public/images/turn-background-red.svg";
import turnBackgroundYellow from "../../../public/images/turn-background-yellow.svg";

type PlayerRedTurnBoxProps = {};

const PlayerRedTurnBox: React.FC<PlayerRedTurnBoxProps> = () => {
  return (
    <div className="flex justify-center -mt-5">
      <div className="relative text-white text-center font-bold w-[191px] z-20">
        <Image
          src={turnBackgroundRed}
          className="w-[191px] h-[150px] absolute z-[-1]"
          alt=""
        />
        <h2 className="text-500 uppercase pt-[2.3rem]">Player 1`s turn</h2>
        <p className="opacity-100 text-900">15s</p>
        {/* <Image
      src={turnBackgroundYellow}
      className="w-[191px] h-[151px]"
      alt=""
    /> */}
      </div>
    </div>
  );
};
export default PlayerRedTurnBox;
