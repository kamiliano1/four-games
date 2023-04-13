import React from "react";
// import { resetGame } from "@/src/components/utility/restartGame";
import { boardFieldState } from "../../atoms/boardAtom";
import { gameState } from "../../atoms/gameAtom";
import { useRecoilState } from "recoil";
import { nanoid } from "nanoid";
import { authModalState } from "@/src/atoms/modalAtom";
// import { useRecoilValue } from "recoil";
type RestartButtonBigProps = {};

const RestartButtonBig: React.FC<RestartButtonBigProps> = () => {
  const [boardState, setBoardState] = useRecoilState(boardFieldState);
  const [gameStates, setGameStates] = useRecoilState(gameState);
  const [modalState, setModalState] = useRecoilState(authModalState);
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
          }
        : {
            ...prev,
            playerStarted: "red",
            currentPlayerTurn: "red",
            yellowPlayerRemainingTime: 30,
            redPlayerRemainingTime: 30,
            isGameOver: false,
            winnerPlayer: "none",
          }
    );
    setModalState((prev) => ({ ...prev, open: false }));
  };
  return (
    <button
      onClick={reset}
      // onClick={() => resetGame(setBoardState, setGameStates)}
      className={`uppercase rounded-[20px] text-700
      mb-7 px-3 font-bold justify-between py-[1.3335rem]
      bg-white text-black border-[3px]
       border-black hover:border-darkPurple shadow-normalBig hover:shadow-hoverBig`}
    >
      Restart
    </button>
  );
};
export default RestartButtonBig;
