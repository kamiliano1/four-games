import React, { CSSProperties, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import SingleField from "./SingleField";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
// import PlayVersus from "../Layout/Buttons/PlayVersus";
// import ContinueEndGame from "../Layout/Buttons/ContinueEndGame";
import MenuButton from "../Layout/Buttons/MenuButton";
import AcceptButton from "../Layout/Buttons/AcceptButton";
import markerRed from "../../public/images/marker-red.svg";
import markerYellow from "../../public/images/marker-yellow.svg";
import counterRedSmall from "../../public/images/counter-red-small.svg";
import counterRedBig from "../../public/images/counter-red-large.svg";
import counterYellowSmall from "../../public/images/counter-yellow-small.svg";
import counterYellowBig from "../../public/images/counter-yellow-large.svg";
import frontBoardLayerSmall from "../../public/images/board-layer-white-small.svg";
import backBoardLayerSmall from "../../public/images/board-layer-black-small.svg";
import frontBoardLayerLarge from "../../public/images/board-layer-white-large.svg";
import backBoardLayerLarge from "../../public/images/board-layer-black-large.svg";
import { useRecoilState } from "recoil";
import { BoardFieldStateType, boardFieldState } from "../atoms/boardAtom";
import { gameState } from "../atoms/gameAtom";
// import { useRecoilState } from "recoil";

// import counterRedSmall from "../../public/images/counter-red-small.svg";
type BoardProps = {};

type BoardFieldProps = {
  id: string;
  name: string;
  row: number;
  column: number;
  isClicked: boolean;
  playerUsed: "none" | "red" | "yellow";
  isWinner: boolean;
};

type PlayerColor = "red" | "yellow" | "none";

const Board: React.FC<BoardProps> = () => {
  const [boardState, setBoardState] = useRecoilState(boardFieldState);
  const [gameStates, setGameStates] = useRecoilState(gameState);
  // console.log(boardState, "gra");

  const [currentPlayerTurn, setCurrentPlayerTurn] =
    useState<PlayerColor>("yellow");

  // const [preparedBoard, setboardState] = useState(
  //   new Array(6).fill(new Array(7).fill("") as BoardFieldProps[])
  // );

  const [loading, setLoading] = useState<boolean>(false);
  const [whiteScore, setWhiteScore] = useState<number>(1);
  const [markerDistance, setMarkerDistance] = useState<number>(0);
  const [winner, setWinner] = useState<PlayerColor>("none");
  const [winnerFieldId, setWinnerFieldId] = useState<string[]>([]);
  const [firstElement, setFirstElement] = useState<number>(0);
  const [yOdleglosc, setYOdleglosc] = useState(0);

  const [currentColumnHover, setCurrentColumnHover] = useState<number>(-1);
  const switchPlayerTurn = () => {
    setGameStates((prev) =>
      prev.currentPlayerTurn === "red"
        ? {
            ...prev,
            currentPlayerTurn: "yellow",
            yellowPlayerRemainingTime: 30,
            redPlayerRemainingTime: 30,
          }
        : {
            ...prev,
            currentPlayerTurn: "red",
            yellowPlayerRemainingTime: 30,
            redPlayerRemainingTime: 30,
          }
    );
    // console.log(gameStates, "tura");

    // setCurrentPlayerTurn((prev) => (prev === "yellow" ? "red" : "yellow"));
  };
  type picturesType = {
    front: StaticImageData;
    back: StaticImageData;
  };
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<picturesType>({
    front: frontBoardLayerSmall,
    back: backBoardLayerSmall,
  });
  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    windowWidth > 767
      ? setCurrentImage({
          front: frontBoardLayerLarge,
          back: backBoardLayerLarge,
        })
      : setCurrentImage({
          front: frontBoardLayerSmall,
          back: backBoardLayerSmall,
        });
  }, [windowWidth]);
  // useEffect(() => {
  //   console.log(whitePlayerScore);
  // }, [whitePlayerScore]);
  useEffect(() => {
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
    // console.log(boardState);
  }, []);

  useEffect(() => {
    // console.log(currentColumnHover);
    setMarkerDistance(30 + currentColumnHover * 90);
  }, [currentColumnHover]);
  useEffect(() => {
    checkRows();
    checkColumns();
    checkDiagonals();
  }, [boardState]);
  // const resetField = () => {
  //   setBoardState((item) =>
  //     item.map((row, rowId) =>
  //       row.map((col: number, colId: number) => ({
  //         id: nanoid(),
  //         name: `Row ${rowId} Col ${colId}`,
  //         row: rowId,
  //         column: colId,
  //         isClicked: false,
  //         playerUsed: "none",
  //       }))
  //     )
  //   );
  //   setWinner("none");
  //   setWinnerFieldId([]);
  //   setGameStates((prev) => ({ ...prev, winnerFieldArray: [] }));
  // };

  useEffect(() => {
    console.log("zwyciestwo,");
    console.log(winnerFieldId);

    // console.log(winner);

    // setBoardState((prev) =>
    //   prev.map((item) =>
    //     item.map((field: BoardFieldStateType) => {
    //       return winnerFieldId.includes(field.id)
    //         ? { ...field, isWinner: true }
    //         : field;
    //     })
    //   )
    // );
    // setBoardState((prev) =>
    //   prev.map((item) =>
    //     item.map((field: BoardFieldStateType) => {
    //       return gameStates.winnerFieldArray.includes(field.id)
    //         ? { ...field, isWinner: true }
    //         : field;
    //     })
    //   )
    // );

    //   setPreparedBoard((prev) =>
    //     prev.map((item) =>
    //       item.map((field: BoardFieldProps) => {
    //         return winnerFieldId.includes(field.id)
    //           ? { ...field, isWinner: true }
    //           : field;
    //       })
    //     )
    //   );
    // }, [winner]);

    setBoardState((prev) =>
      prev.map((item) =>
        item.map((field: BoardFieldStateType) => {
          // console.log(field.id, "ide");

          // console.log(gameStates.winnerFieldArray.includes(field.id), "tak");
          // console.log(winnerFieldId, field.id, "tak");
          // console.log(gameStates.winnerPlayer);

          return winnerFieldId.includes(field.id)
            ? { ...field, isWinner: true }
            : field;
        })
      )
    );
  }, [winner]);
  // const defaulBoardFieldState: BoardFieldStateType[] = new Array(6).fill(
  //   new Array(7).fill("")
  // );
  // const kk = defaulBoardFieldState.map((row, rowId) => {
  //   row.map((col: number, colId: number) => ({
  //     id: nanoid(),
  //     // name: `Row ${rowId} Col ${colId}`,
  //     row: rowId,
  //     column: colId,
  //     isClicked: false,
  //     playerUsed: "none",
  //     isWinner: false,
  //   }));
  // });

  // const kkk = defaulBoardFieldState.map((row, rowId) => {
  //   return row.map((col: number, colId: number) => ({
  //     id: nanoid(),
  //     // name: `Row ${rowId} Col ${colId}`,
  //     row: rowId,
  //     column: colId,
  //     isClicked: false,
  //     playerUsed: "none",
  //     isWinner: false,
  //   }));
  // });

  // console.log(kkk, "llll");
  useEffect(() => {}, []);
  const checkWinner = (
    arrayToCheck: BoardFieldStateType[] | BoardFieldStateType
  ) => {
    // console.log(arrayToCheck);

    if (arrayToCheck.length) {
      let whitePlayerScore = 0;
      let redPlayerScore = 0;
      let whiteWinnerArray: string[] = [];
      let redWinnerArray: string[] = [];

      arrayToCheck.map((field: BoardFieldStateType) => {
        if (field.playerUsed === "yellow") {
          whitePlayerScore++;
          whiteWinnerArray.push(field.id);

          if (whitePlayerScore >= 4) {
            setWinner("yellow");
            setWinnerFieldId(whiteWinnerArray);
            console.log(winnerFieldId);

            // setWinnerFieldId([]);
            setGameStates((prev) => ({
              ...prev,
              yellowPlayerScore: prev.yellowPlayerScore + 1,
              isGameOver: true,
              winnerPlayer: "Player 2",
            }));
          }
          return;
        } else {
          whitePlayerScore = 0;
          whiteWinnerArray = [];
        }
      });
      //   if (field.playerUsed === "yellow") {
      //     whitePlayerScore++;
      //     whiteWinnerArray.push(field.id);

      //     if (whitePlayerScore >= 4) {
      //       setWinner("yellow");
      //       setWinnerFieldId(whiteWinnerArray);
      //     }

      //     return;
      //   } else if (field.playerUsed === "red") {
      //     redPlayerScore++;
      //     redWinnerArray.push(field.id);
      //   } else {
      //     whitePlayerScore = 0;
      //     whiteWinnerArray = [];
      //     redPlayerScore = 0;
      //     redWinnerArray = [];
      //   }
      // });
      arrayToCheck.map((field: BoardFieldStateType) => {
        if (field.playerUsed === "red") {
          redPlayerScore++;
          redWinnerArray.push(field.id);
          // console.log(field.id, "ide");

          if (redPlayerScore >= 4) {
            setWinner("red");
            setWinnerFieldId(redWinnerArray);
            // console.log(winnerFieldId, "red arraj");
            setGameStates((prev) => ({
              ...prev,
              redPlayerScore: prev.redPlayerScore + 1,
              isGameOver: true,
              winnerPlayer: "Player 1",
            }));

            // setBoardState(prev=>)
          }
          return;
        } else {
          redPlayerScore = 0;
          redWinnerArray = [];
        }
      });
    }
  };

  const checkColumns = () => {
    const columnIndex = [0, 1, 2, 3, 4, 5, 6];
    columnIndex.map((columnId) => {
      const diagonalFieldArray: BoardFieldStateType[] = [];
      boardState.filter((item) => {
        return item.filter((field: BoardFieldStateType) => {
          if (field.column === columnId) diagonalFieldArray.push(field);
          checkWinner(diagonalFieldArray);
        });
      });
    });
  };
  const checkRows = () => {
    boardState.map((rows: BoardFieldStateType) => {
      checkWinner(rows);
    });
  };

  const checkDiagonals = () => {
    const rowCounter = [-4, -3, -2, -1, 0, 1, 2, 3];

    rowCounter.map((columnId) => {
      const diagonalFieldArray: BoardFieldStateType[] = [];
      const diagonalFieldArrayOne: BoardFieldStateType[] = [];
      const diagonalFieldArrayTwo: BoardFieldStateType[] = [];
      boardState.filter((item, row: number) => {
        return item.filter((field: BoardFieldStateType, col: number) => {
          if (field.row === row && field.column === row + columnId)
            diagonalFieldArray.push(field);
          checkWinner(diagonalFieldArray);
          if (field.row === col + columnId && field.column === col) {
            diagonalFieldArrayOne.push(field);
            checkWinner(diagonalFieldArrayOne);
          }

          if (
            field.row === row &&
            field.column === boardState.length - row + columnId
          ) {
            diagonalFieldArrayTwo.push(field);
            checkWinner(diagonalFieldArrayTwo);
          }
        });
      });
    });
    // console.log(diagonalArrayTestowa, "diag");
    // setboardState((prev) =>
    //   prev.map((item) =>
    //     item.map((field: BoardFieldProps) => {
    //       return diagonalArrayTestowa.includes(field.id)
    //         ? { ...field, isWinner: true }
    //         : field;
    //     })
    //   )
    // );
  };

  const clickField = (
    id: string,
    isClicked: boolean,
    fieldCol: number,
    fieldRow: number
  ) => {
    // console.log(gameStates.isGameOver, "isGameOver");

    if (isClicked || gameStates.isGameOver) return;

    const diagonalFieldArray: BoardFieldStateType[] = [];
    boardState.filter((item) => {
      return item.filter((field: BoardFieldStateType) => {
        if (field.column === fieldCol) diagonalFieldArray.push(field);
      });
    });

    const lastEmptyIndexColumn = diagonalFieldArray.findLastIndex(
      (item: BoardFieldStateType) => {
        return item.isClicked === false;
      }
    );
    const lastEmptyId = diagonalFieldArray[lastEmptyIndexColumn].id;
    setBoardState((item) =>
      item.map((row) =>
        row.map((col: BoardFieldStateType) => {
          return col.id === lastEmptyId
            ? {
                ...col,
                isClicked: true,
                playerUsed: gameStates.currentPlayerTurn,
              }
            : col;
        })
      )
    );
    setBoardState((item) =>
      item.map((row) =>
        row.map((col: BoardFieldStateType) => {
          return col.id === lastEmptyId
            ? {
                ...col,
                isClicked: true,
                playerUsed: gameStates.currentPlayerTurn,
              }
            : col;
        })
      )
    );

    // setboardState((item) =>
    //   item.map((row) =>
    //     row.map((col: BoardFieldProps) => {
    //       return col.id === id
    //         ? { ...col, isClicked: true, playerUsed: currentPlayerTurn }
    //         : col;
    //     })
    //   )
    // );
    // console.log(fieldRow, fieldCol);

    // checkRows();
    switchPlayerTurn();
  };

  const currentHoverColumn = (column: number) => {
    // console.log(column);

    setCurrentColumnHover(column);
  };
  const printBoard = boardState.map((row, rowId) =>
    row.map((col: BoardFieldStateType, colId: number) => {
      return (
        <SingleField
          key={col.id}
          name={`Row ${col.row} Col ${col.column}`}
          id={col.id}
          row={col.row}
          column={col.column}
          isClicked={col.isClicked}
          playerUsed={col.playerUsed}
          isWinner={col.isWinner}
          field={() => clickField(col.id, col.isClicked, col.column, col.row)}
          currentField={boardState}
          currentHoverColumn={() => currentHoverColumn(col.column)}
        />
      );
    })
  );
  const dystans: CSSProperties = {
    // left: `70 * ${markerDistance}px`,
    left: markerDistance,
  };

  return (
    <div className="relative mx-auto flex justify-center col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-1">
      <Image
        src={currentImage.front}
        alt="game board"
        className="absolute z-[-4] "
      />
      {/* <Image
        src={counterYellowSmall}
        className="w-[33.95px] h-[33.95px]"
        alt=""
      /> */}

      {/* <Image src={counterYellowSmall} alt="" />
      <span className="w-[41px] aspect-square block bg-slate-500 rounded-full"></span>
      <span className="w-[70px] aspect-square block bg-slate-500 rounded-full"></span>
      <Image src={counterYellowBig} alt="" /> */}
      {/* <PlayVersus type="vsPlayer" />
      <PlayVersus type="vsCPU" />
      <ContinueEndGame type="ContinueGame" />
      <ContinueEndGame type="QuitGame" /> */}

      {/* <Menu /> */}
      {/* <motion.div
        animate={{ x: 30, y: yOdleglosc }}
        transition={{ type: "spring", stiffness: 100, duration: 1 }}
      >
        <h1 className="text-4xl text-red-500">
          Test{currentColumnHover}, gracz {currentPlayerTurn} {markerDistance}
        </h1>
      </motion.div> */}

      {/* <Image src={counterRedSmall} className="ml-10 z-[-5] " alt="" /> */}
      {/* <Image
          src={currentImage.back}
          alt="game board"
          className="absolute z-[-6]"
        /> */}
      {/* {windowWidth > 1023 && (
          <Image
            style={dystans}
            src={markerRed}
            className={`absolute top-[-31px]`}
            alt=" "
          />
        )} */}

      <div
        className="z-[30] ml-2 mt-1 grid gap-x-[5.5px] grid-cols-[repeat(7,42px)] grid-rows-6  
sm:grid-cols-[repeat(7,75px)] w-[336px] sm:w-[630px] sm:mt-5 sm:ml-9 sm:gap-[12.5px]"
      >
        {printBoard}
      </div>
      {/* <div className="mt-2 ml-2 w-[350px] sm:w-[632px] sm:ml-8 sm:mt-5 z-[500] ">
          {printBoard}
        </div> */}
      {/* <div className="flex mt-20">
        <span className="w-[75px] aspect-square block items-start bg-slate-500 rounded-full "></span>
        <Image src={counterRedBig} className="ml-10 z-[-5] " alt="" />
        <Image src={counterRedSmall} className="ml-10 z-[-5] " alt="" />
      </div> */}

      {/* <button
        style={{ margin: "2rem", background: "teal" }}
        onClick={checkRows}
      >
        Sprawdz wiersze
      </button>
      <button
        style={{ margin: "2rem", background: "teal" }}
        onClick={checkColumns}
      >
        Sprawdz kolumny
      </button>
      <button
        style={{ margin: "2rem", background: "teal" }}
        onClick={checkDiagonals}
      >
        Sprawdz przekatne
      </button>
      <button
        style={{ margin: "2rem", background: "teal" }}
        onClick={resetField}
      >
        Reset
      </button>
      <button
        style={{ margin: "2rem", background: "teal" }}
        onClick={swichtPlayerTurn}
      >
        Zmiana gracza
      </button>
      <button
        style={{ margin: "2rem", background: "teal" }}
        onClick={() => setYOdleglosc((prev) => prev + 30)}
      >
        Zwieksz yOdleglosc
      </button> */}
    </div>
  );
};
export default Board;
