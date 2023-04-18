import React from "react";
import { authModalState } from "../../../atoms/modalAtom";
import { useRecoilState } from "recoil";

const GameRulesButton: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  return (
    <button
      onClick={() => setModalState((prev) => ({ ...prev, view: "rules" }))}
      className={`uppercase rounded-[20px] text-700
      mb-7 px-3 font-bold text-start py-[1.3335rem]
      } border-[3px] bg-white text-black 
       border-black hover:border-darkPurple shadow-normalBig hover:shadow-hoverBig`}
    >
      Game Rules
    </button>
  );
};
export default GameRulesButton;
