import React from "react";
import { BsCheck2 } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { authModalState } from "../../atoms/modalAtom";
type AcceptButtonProps = {};

const AcceptButton: React.FC<AcceptButtonProps> = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  return (
    <div className="absolute left-[calc(50%-35px)] bottom-[-35px]">
      <button
        onClick={() => setModalState((prev) => ({ ...prev, view: "start" }))}
        className="bg-red rounded-full px-[8px] border-[3px] aspect-square
    shadow-normalSmall hover:shadow-hoverSmall border-black hover:border-darkPurple">
        <span className="sr-only">OK button</span>
        <BsCheck2 className="text-5xl text-white" />
      </button>
    </div>
  );
};
export default AcceptButton;
