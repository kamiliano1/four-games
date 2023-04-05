import React from "react";
import iconCheck from "../../../public/images/icon-check.svg";
import Image from "next/image";
import { AiOutlineCheck } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";
import { authModalState } from "../../atoms/modalAtom";
import { useRecoilState } from "recoil";
type AcceptProps = {};

const Accept: React.FC<AcceptProps> = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  return (
    <div className="absolute left-[calc(50%-35px)] bottom-[-35px]">
      <button
        onClick={() => setModalState((prev) => ({ ...prev, view: "start" }))}
        className="bg-red rounded-full px-[8px] border-[3px] aspect-square
    shadow-normalSmall hover:shadow-hoverSmall border-black hover:border-darkPurple"
      >
        <span className="sr-only">OK button</span>
        <BsCheck2 className="text-5xl text-white" />
      </button>
    </div>
  );
};
export default Accept;
