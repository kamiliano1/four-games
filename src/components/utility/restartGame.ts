import { BoardFieldStateType } from "@/src/atoms/boardAtom";
import { GameState } from "@/src/atoms/gameAtom";
import { nanoid } from "nanoid";

type ResetGame = {
  board: (
    valOrUpdater:
      | BoardFieldStateType[]
      | ((currVal: BoardFieldStateType[]) => BoardFieldStateType[])
  ) => void;
  game: (valOrUpdater: GameState | ((currVal: GameState) => GameState)) => void;
};
export const resetGame = (board: any, game: any) => {
  board((item) =>
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
  game((prev) =>
    prev.playerStarted === "red"
      ? {
          ...prev,
          playerStarted: "yellow",
          currentPlayerTurn: "yellow",
          yellowPlayerRemainingTime: 30,
          redPlayerRemainingTime: 30,
        }
      : {
          ...prev,
          playerStarted: "red",
          currentPlayerTurn: "red",
          yellowPlayerRemainingTime: 30,
          redPlayerRemainingTime: 30,
        }
  );
};

// type PlayerScoreProps = {
//     name: string;
//     score: number;
//     playerId: number;
//   };

//   const PlayerScore: React.FC<PlayerScoreProps> = ({ name, score, playerId }) => {
