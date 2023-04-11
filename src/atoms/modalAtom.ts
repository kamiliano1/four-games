import { atom } from "recoil";

export interface AuthModalState {
  open: boolean;
  view: "start" | "rules" | "pause";
  isPaused: boolean;
}

const defaultModalState: AuthModalState = {
  open: true,
  view: "start",
  isPaused: false,
};

export const authModalState = atom<AuthModalState>({
  key: "authModalState",
  default: defaultModalState,
});
