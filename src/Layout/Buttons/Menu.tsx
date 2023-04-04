import React from "react";

type MenuProps = {};

const Menu: React.FC<MenuProps> = () => {
  return (
    <button className="uppercase py-[.625rem] px-5 bg-darkPurple hover:bg-red text-500 text-white font-bold rounded-[20px]">
      Menu
    </button>
  );
};
export default Menu;
