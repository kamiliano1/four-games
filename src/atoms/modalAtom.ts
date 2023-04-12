import { atom } from "recoil";

export interface AuthModalState {
  open: boolean;
  view: "start" | "rules" | "pause";
}

const defaultModalState: AuthModalState = {
  open: true,
  view: "start",
};

export const authModalState = atom<AuthModalState>({
  key: "authModalState",
  default: defaultModalState,
});
