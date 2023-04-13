import React from "react";

type MenuButtonProps = {};
import { authModalState } from "../../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { gameState } from "../../atoms/gameAtom";
const MenuButton: React.FC<MenuButtonProps> = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [gameStates, setGameStates] = useRecoilState(gameState);
  const openMenuModal = () => {
    setModalState((prev) => ({ ...prev, open: true, view: "pause" }));
    setGameStates((prev) => ({ ...prev, isPaused: true }));
  };
  return (
    <button
      onClick={openMenuModal}
      className="uppercase py-[.625rem] w-[108px] bg-darkPurple hover:bg-red text-500 text-white font-bold rounded-[20px]"
    >
      Menu
    </button>
  );
};
export default MenuButton;
