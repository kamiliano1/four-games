import Image from "next/image";
import React from "react";
import playerVsPlayer from "../../../public/images/player-vs-player.svg";
import { authModalState } from "../../atoms/modalAtom";
import { useRecoilState } from "recoil";
type PlayVsPlayerButtonProps = {};

const PlayVsPlayerButton: React.FC<PlayVsPlayerButtonProps> = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  return (
    <button
      onClick={() => {
        setModalState((prev) => ({ ...prev, open: false }));
      }}
      className={` text-700 mb-7 
        px-3 uppercase flex items-center rounded-[20px] 
        py-[10.34px] font-bold justify-between bg-yellow text-black
        border-[3px] border-black hover:border-darkPurple 
        shadow-normalBig hover:shadow-hoverBig`}>
      Play vs Player
      <Image src={playerVsPlayer} alt="" />
    </button>
  );
};
export default PlayVsPlayerButton;
