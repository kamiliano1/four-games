import React from "react";
import { boardFieldState } from "../../atoms/boardAtom";
import { gameState } from "../../atoms/gameAtom";
import { useRecoilState } from "recoil";
import { nanoid } from "nanoid";
import { authModalState } from "@/src/atoms/modalAtom";
import useReset from "../../hooks/useReset";
const RestartButtonBig: React.FC = () => {
  const { resetGame } = useReset();
  const [boardState, setBoardState] = useRecoilState(boardFieldState);
  const [gameStates, setGameStates] = useRecoilState(gameState);
  const [modalState, setModalState] = useRecoilState(authModalState);
  const reset = () => {
    resetGame();
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
    // setGameStates((prev) =>
    //   prev.playerStarted === "red"
    //     ? {
    //         ...prev,
    //         playerStarted: "yellow",
    //         currentPlayerTurn: "yellow",
    //         yellowPlayerRemainingTime: 30,
    //         redPlayerRemainingTime: 30,
    //         isGameOver: false,
    //         winnerPlayer: "none",
    //         isPaused: false,
    //         redPlayerScore: 0,
    //         yellowPlayerScore: 0,
    //       }
    //     : {
    //         ...prev,
    //         playerStarted: "red",
    //         currentPlayerTurn: "red",
    //         yellowPlayerRemainingTime: 30,
    //         redPlayerRemainingTime: 30,
    //         isGameOver: false,
    //         winnerPlayer: "none",
    //         isPaused: false,
    //         redPlayerScore: 0,
    //         yellowPlayerScore: 0,
    //       }
    // );
    setModalState((prev) => ({ ...prev, open: false }));
  };
  return (
    <button
      onClick={reset}
      className={`uppercase rounded-[20px] text-700
      mb-7 px-3 font-bold justify-between py-[1.3335rem]
      bg-white text-black border-[3px]
       border-black hover:border-darkPurple shadow-normalBig hover:shadow-hoverBig`}
    >
      Restarttttttttttttt
    </button>
  );
};
export default RestartButtonBig;
