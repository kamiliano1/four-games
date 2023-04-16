import Head from "next/head";
import Board from "../components/Board";
import StartModal from "../components/Modal/StartModal";
import RulesModal from "../components/Modal/RulesModal";
import PauseModal from "../components/Modal/PauseModal";
import { authModalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import Game from "../components/Game/Game";

export default function Home() {
  const [modalState, setModalState] = useRecoilState(authModalState);

  return (
    <>
      <Head>
        <title>Frontend Mentor | Connect Four game</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
      </Head>
      <main className="">
        {modalState.open && (
          <>
            {modalState.view === "start" && <StartModal />}
            {modalState.view === "pause" && <PauseModal />}
            {modalState.view === "rules" && <RulesModal />}
          </>
        )}
        {/* {modalState.view !== "start" ||
          (modalState.view !== "rules" && <Game />)} */}

        {modalState.open &&
        (modalState.view === "start" || modalState.view === "rules") ? (
          ""
        ) : (
          <Game />
        )}

        {/* <Game /> */}
        {/* <Board /> */}
        {/* <StartModal /> */}
        {/* <RulesModal /> */}

        {/* <Board /> */}
      </main>
    </>
  );
}
