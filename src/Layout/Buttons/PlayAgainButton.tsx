import { boardFieldState } from "@/src/atoms/boardAtom";
import { gameState } from "@/src/atoms/gameAtom";
import React from "react";
import { useRecoilState } from "recoil";
import { nanoid } from "nanoid";

type PlayAgainButtonProps = {};

const PlayAgainButton: React.FC<PlayAgainButtonProps> = () => {
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
    setGameStates((prev) =>
      prev.playerStarted === "red"
        ? {
            ...prev,
            playerStarted: "yellow",
            currentPlayerTurn: "yellow",
            yellowPlayerRemainingTime: 30,
            redPlayerRemainingTime: 30,
            isGameOver: false,
            winnerPlayer: "none",
            isPaused: false,
          }
        : {
            ...prev,
            playerStarted: "red",
            currentPlayerTurn: "red",
            yellowPlayerRemainingTime: 30,
            redPlayerRemainingTime: 30,
            isGameOver: false,
            winnerPlayer: "none",
            isPaused: false,
          }
    );
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
