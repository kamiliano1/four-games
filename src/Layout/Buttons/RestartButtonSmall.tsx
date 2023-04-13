import React from "react";
import { useRecoilState } from "recoil";
import { boardFieldState } from "../../atoms/boardAtom";
import { gameState } from "../../atoms/gameAtom";
import { nanoid } from "nanoid";
// import { resetGame } from "@/src/components/utility/restartGame";
type RestartButtonSmallProps = {};

const RestartButtonSmall: React.FC<RestartButtonSmallProps> = () => {
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
            redPlayerScore: 0,
            yellowPlayerScore: 0,
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
            redPlayerScore: 0,
            yellowPlayerScore: 0,
          }
    );
  };
  return (
    <button
      onClick={reset}
      // onClick={() => resetGame(setBoardState, setGameStates)}
      className="uppercase py-[.625rem] w-[108px] bg-darkPurple hover:bg-red text-500 text-white font-bold rounded-[20px]"
    >
      Restart
    </button>
  );
};
export default RestartButtonSmall;
