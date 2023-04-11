import { atom } from "recoil";
import { nanoid } from "nanoid";
export type BoardFieldStateType = {
  [x: string]: any;
  id: string;
  name: string;
  row: number;
  column: number;
  isClicked: boolean;
  playerUsed: "none" | "red" | "white";
  isWinner: boolean;
};

const initialArray = new Array(6).fill(new Array(7).fill([]));

const defaulBoardFieldState: BoardFieldStateType[] = initialArray.map(
  (row, rowId) => {
    return row.map((col: number, colId: number) => ({
      id: nanoid(),
      row: rowId,
      column: colId,
      isClicked: false,
      playerUsed: "none",
      isWinner: false,
    }));
  }
);

export const boardFieldState = atom<BoardFieldStateType[]>({
  key: "boardFieldState",
  default: defaulBoardFieldState,
});
