import { boardFieldState } from "@/src/atoms/boardAtom";
import { gameState } from "@/src/atoms/gameAtom";
import React from "react";
import { useRecoilState } from "recoil";
import { nanoid } from "nanoid";
import useReset from "../../hooks/useReset";
const PlayAgainButton: React.FC = () => {
  const { resetGame } = useReset("continue");
  const [boardState, setBoardState] = useRecoilState(boardFieldState);
  const [gameStates, setGameStates] = useRecoilState(gameState);
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
    resetGame();
  };
  return (
    <button
      onClick={reset}
      className="uppercase py-[.625rem] w-[130px] bg-darkPurple hover:bg-red text-500 text-white font-bold rounded-[20px]"
    >
      Play Again
    </button>
  );
};
export default PlayAgainButton;
