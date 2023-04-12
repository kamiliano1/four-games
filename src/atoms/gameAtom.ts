import { atom } from "recoil";

export interface GameState {
  isPaused: boolean;
  currentPlayerTurn: "none" | "red" | "yellow";
  playerStarted: "red" | "yellow";
  redPlayerScore: number;
  yellowPlayerScore: number;
  redPlayerRemainingTime: number;
  yellowPlayerRemainingTime: number;
  isGameOver: boolean;
  winnerPlayer: "none" | "red" | "yellow";
  winnerFieldArray: string[];
}

const defaultGameState: GameState = {
  isPaused: true,
  currentPlayerTurn: "red",
  playerStarted: "red",
  redPlayerScore: 0,
  yellowPlayerScore: 0,
  redPlayerRemainingTime: 30,
  yellowPlayerRemainingTime: 30,
  isGameOver: false,
  winnerPlayer: "none",
  winnerFieldArray: [],
};

export const gameState = atom<GameState>({
  key: "gameState",
  default: defaultGameState,
});
