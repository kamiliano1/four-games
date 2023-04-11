import React from "react";
import { useRecoilState } from "recoil";
import { BoardFieldStateType, boardFieldState } from "../../atoms/boardAtom";
import { nanoid } from "nanoid";
type RestartButtonSmallProps = {};

const RestartButtonSmall: React.FC<RestartButtonSmallProps> = () => {
  const [boardState, setBoardState] = useRecoilState(boardFieldState);
  const reset = () => {
    setBoardState((item) =>
      item.map((row, rowId) =>
        row.map((col: number, colId: number) => ({
          id: nanoid(),
          name: `Row ${rowId} Col ${colId}`,
          row: rowId,
          column: colId,
          isClicked: false,
          playerUsed: "none",
          isWinner: false,
        }))
      )
    );
  };
  return (
    <button
      onClick={reset}
      className="uppercase py-[.625rem] w-[108px] bg-darkPurple hover:bg-red text-500 text-white font-bold rounded-[20px]"
    >
      Restart
    </button>
  );
};
export default RestartButtonSmall;
