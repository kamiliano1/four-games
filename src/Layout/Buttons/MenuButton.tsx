import React from "react";

type MenuButtonProps = {};
import { authModalState } from "../../atoms/modalAtom";
import { useRecoilState } from "recoil";

const MenuButton: React.FC<MenuButtonProps> = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  return (
    <button
      onClick={() =>
        setModalState((prev) => ({ ...prev, open: true, view: "pause" }))
      }
      className="uppercase py-[.625rem] w-[108px] bg-darkPurple hover:bg-red text-500 text-white font-bold rounded-[20px]"
    >
      Menu
    </button>
  );
};
export default MenuButton;
