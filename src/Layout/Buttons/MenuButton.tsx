import React from "react";

type MenuButtonProps = {};

const MenuButton: React.FC<MenuButtonProps> = () => {
  return (
    <button className="uppercase py-[.625rem] w-[108px] bg-darkPurple hover:bg-red text-500 text-white font-bold rounded-[20px]">
      Menu
    </button>
  );
};
export default MenuButton;
