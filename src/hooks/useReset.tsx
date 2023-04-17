import { useRecoilState } from "recoil";
import { boardFieldState } from "../atoms/boardAtom";
import { gameState } from "../atoms/gameAtom";
import { nanoid } from "nanoid";
import { defaultGameState } from "../atoms/gameAtom";

type ResetTypes = "continue" | "start over";
const useReset = (resetType: ResetTypes) => {
  const [boardState, setBoardState] = useRecoilState(boardFieldState);
  const [gameStates, setGameStates] = useRecoilState(gameState);

  const resetGame = () => {
    setBoardState((item) =>
      item.map((row, rowId) =>
        row.map((col: number, colId: number) => ({
          id: nanoid(),
          row: rowId,
          column: colId,
          isClicked: false,
          playerUsed: "none",
          isWinner: false,
        }))
      )
    );
    if (resetType === "start over") {
      setGameStates({ ...defaultGameState, isPaused: false });
    } else {
      setGameStates((prev) =>
        prev.playerStarted === "red"
          ? {
              ...prev,
              isPaused: false,
              currentPlayerTurn: "yellow",
              playerStarted: "yellow",
              // redPlayerScore: 0,
              // yellowPlayerScore: 0,
              redPlayerRemainingTime: 30,
              yellowPlayerRemainingTime: 30,
              isGameOver: false,
              winnerPlayer: "none",
            }
          : {
              ...prev,
              isPaused: false,
              currentPlayerTurn: "red",
              playerStarted: "red",
              // redPlayerScore: 0,
              // yellowPlayerScore: 0,
              redPlayerRemainingTime: 30,
              yellowPlayerRemainingTime: 30,
              isGameOver: false,
              winnerPlayer: "none",
            }
      );
    }
  };

  return { resetGame };
};
export default useReset;
