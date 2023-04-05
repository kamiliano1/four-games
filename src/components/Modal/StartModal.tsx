import React from "react";
import logo from "../../../public/images/logo.svg";
import Image from "next/image";
import PlayVersus from "@/src/Layout/Buttons/PlayVersus";
import ContinueEndGame from "@/src/Layout/Buttons/ContinueEndGame";
import GameRules from "@/src/Layout/Buttons/GameRules";
import { authModalState } from "../../atoms/modalAtom";
import { useRecoilState } from "recoil";
type StartModalProps = {};

const StartModal: React.FC<StartModalProps> = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  return (
    <div className="bg-purple w-full sm:bg-darkPurple h-[100vh] sm:flex">
      <div
        className=" bg-purple flex flex-col justify-center h-[100vh] px-2 sm:px-10 sm:pt-[4.375rem] sm:pb-8  max-w-[480px]
       m-auto sm:shadow-normalBig sm:w-[480px] sm:rounded-[40px] sm:h-auto sm:border-[3px] sm:border-black"
      >
        <Image src={logo} alt="web logo" className="mx-auto mb-20" />
        <PlayVersus type="vsPlayer" />
        {/* <PlayVersus type="vsCPU" /> */}
        <GameRules />
      </div>
    </div>
  );
};
export default StartModal;
