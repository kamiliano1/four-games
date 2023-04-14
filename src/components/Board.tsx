import React, { CSSProperties, useCallback, useEffect, useState } from "react";
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

  const [currentPlayerTurn, setCurrentPlayerTurn] =
    useState<PlayerColor>("yellow");

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
  }, []);

  const checkWinsField = useCallback(() => {
    const checkWinner = (
      arrayToCheck: BoardFieldStateType[] | BoardFieldStateType
    ) => {
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
        arrayToCheck.map((field: BoardFieldStateType) => {
          if (field.playerUsed === "red") {
            redPlayerScore++;
            redWinnerArray.push(field.id);

            if (redPlayerScore >= 4) {
              setWinner("red");
              setWinnerFieldId(redWinnerArray);

              setGameStates((prev) => ({
                ...prev,
                redPlayerScore: prev.redPlayerScore + 1,
                isGameOver: true,
                winnerPlayer: "Player 1",
              }));
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
    };

    checkRows();
    checkColumns();
    checkDiagonals();
  }, [boardState]);
  useEffect(() => {
    setMarkerDistance(51 + currentColumnHover * 89);
  }, [currentColumnHover]);
  useEffect(() => {
    const checkWinner = (
      arrayToCheck: BoardFieldStateType[] | BoardFieldStateType
    ) => {
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
        arrayToCheck.map((field: BoardFieldStateType) => {
          if (field.playerUsed === "red") {
            redPlayerScore++;
            redWinnerArray.push(field.id);

            if (redPlayerScore >= 4) {
              setWinner("red");
              setWinnerFieldId(redWinnerArray);

              setGameStates((prev) => ({
                ...prev,
                redPlayerScore: prev.redPlayerScore + 1,
                isGameOver: true,
                winnerPlayer: "Player 1",
              }));
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
    };

    checkRows();
    checkColumns();
    checkDiagonals();
  }, [boardState]);
  useEffect(() => {
    checkWinsField;
  }, [checkWinsField]);

  useEffect(() => {
    const setWinnerField = () => {
      console.log("zwyciestwo,");
      console.log(winnerFieldId);
      setBoardState((prev) =>
        prev.map((item) =>
          item.map((field: BoardFieldStateType) => {
            setLoading(false);
            return winnerFieldId.includes(field.id)
              ? { ...field, isWinner: true }
              : field;
          })
        )
      );
    };
    // if (loading) setWinnerField();
    setWinnerField();
  }, []);
  useEffect(() => {}, []);

  const clickField = (
    id: string,
    isClicked: boolean,
    fieldCol: number,
    fieldRow: number
  ) => {
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

    switchPlayerTurn();
    console.log(boardState);
  };

  const currentHoverColumn = (column: number) => {
    setCurrentColumnHover(column);
  };

  const druk = [
    [
      {
        id: "Df5zFvMulwtDCtEXfjWcx",
        name: "Row 0 Col 0",
        row: 0,
        column: 0,
        isClicked: false,
        playerUsed: "none",
        isWinner: false,
      },
      {
        id: "AJR3DHvpKjOWszeQFMo6k",
        name: "Row 0 Col 1",
        row: 0,
        column: 1,
        isClicked: false,
        playerUsed: "none",
        isWinner: false,
      },
      {
        id: "83qIi7bKubzwaSpmGpjsW",
        name: "Row 0 Col 2",
        row: 0,
        column: 2,
        isClicked: true,
        playerUsed: "red",
        isWinner: false,
      },
      {
        id: "8Ivs_SZ_6IJjEDcU4EA_2",
        name: "Row 0 Col 3",
        row: 0,
        column: 3,
        isClicked: false,
        playerUsed: "none",
        isWinner: false,
      },
      {
        id: "W_r7utxMgUKRc0wxlS0WB",
        name: "Row 0 Col 4",
        row: 0,
        column: 4,
        isClicked: false,
        playerUsed: "none",
        isWinner: false,
      },
      {
        id: "MhcupavMcCzuy-YWw57m3",
        name: "Row 0 Col 5",
        row: 0,
        column: 5,
        isClicked: true,
        playerUsed: "red",
        isWinner: false,
      },
      {
        id: "ErpsOveIVJ3kYCVbKo2_t",
        name: "Row 0 Col 6",
        row: 0,
        column: 6,
        isClicked: false,
        playerUsed: "none",
        isWinner: false,
      },
    ],
    [
      {
        id: "PDMXTeZZI13f4oxAvzeMg",
        name: "Row 1 Col 0",
        row: 1,
        column: 0,
        isClicked: true,
        playerUsed: "red",
        isWinner: false,
      },
      {
        id: "OVqsMBPIDsazaKNG1ti0g",
        name: "Row 1 Col 1",
        row: 1,
        column: 1,
        isClicked: true,
        playerUsed: "yellow",
        isWinner: false,
      },
      {
        id: "8pbUU1uAz7sJSsvg11hrc",
        name: "Row 1 Col 2",
        row: 1,
        column: 2,
        isClicked: true,
        playerUsed: "yellow",
        isWinner: false,
      },
      {
        id: "nlN06ne43hyllteEMJbzo",
        name: "Row 1 Col 3",
        row: 1,
        column: 3,
        isClicked: true,
        playerUsed: "yellow",
        isWinner: false,
      },
      {
        id: "PRcqJHJ7NGhIwPLqBHvsR",
        name: "Row 1 Col 4",
        row: 1,
        column: 4,
        isClicked: false,
        playerUsed: "none",
        isWinner: false,
      },
      {
        id: "_Yctm2ioa5awHCv6fQF0g",
        name: "Row 1 Col 5",
        row: 1,
        column: 5,
        isClicked: true,
        playerUsed: "red",
        isWinner: false,
      },
      {
        id: "uZ3t-0Vz6RUujFhciDXjh",
        name: "Row 1 Col 6",
        row: 1,
        column: 6,
        isClicked: true,
        playerUsed: "yellow",
        isWinner: false,
      },
    ],
    [
      {
        id: "WDM2T2MHwNEInogvvWu3a",
        name: "Row 2 Col 0",
        row: 2,
        column: 0,
        isClicked: true,
        playerUsed: "yellow",
        isWinner: false,
      },
      {
        id: "DrmiQNGhCTQPnst6v7ESQ",
        name: "Row 2 Col 1",
        row: 2,
        column: 1,
        isClicked: true,
        playerUsed: "red",
        isWinner: false,
      },
      {
        id: "B4qvqGIZuEDrALUaM-vHA",
        name: "Row 2 Col 2",
        row: 2,
        column: 2,
        isClicked: true,
        playerUsed: "red",
        isWinner: false,
      },
      {
        id: "fkZcBTJNw1EpTtIg8bjfI",
        name: "Row 2 Col 3",
        row: 2,
        column: 3,
        isClicked: true,
        playerUsed: "red",
        isWinner: false,
      },
      {
        id: "mnsVRPQ3YWSr8YaVizCR3",
        name: "Row 2 Col 4",
        row: 2,
        column: 4,
        isClicked: true,
        playerUsed: "yellow",
        isWinner: false,
      },
      {
        id: "l3zj7vedMEy19jHXZxxIB",
        name: "Row 2 Col 5",
        row: 2,
        column: 5,
        isClicked: true,
        playerUsed: "yellow",
        isWinner: false,
      },
      {
        id: "Os7Mz73DkZkDCgQPQj-6I",
        name: "Row 2 Col 6",
        row: 2,
        column: 6,
        isClicked: true,
        playerUsed: "yellow",
        isWinner: false,
      },
    ],
    [
      {
        id: "ILJs9EjMiMk5rNJRS6ogo",
        name: "Row 3 Col 0",
        row: 3,
        column: 0,
        isClicked: true,
        playerUsed: "red",
        isWinner: false,
      },
      {
        id: "FG3Cjwrjb5zSVJI_NJqyP",
        name: "Row 3 Col 1",
        row: 3,
        column: 1,
        isClicked: true,
        playerUsed: "yellow",
        isWinner: false,
      },
      {
        id: "uJM-GkqZpsCsWG9hsjlom",
        name: "Row 3 Col 2",
        row: 3,
        column: 2,
        isClicked: true,
        playerUsed: "yellow",
        isWinner: false,
      },
      {
        id: "Uuru44n6RMPiTxu1Matv8",
        name: "Row 3 Col 3",
        row: 3,
        column: 3,
        isClicked: true,
        playerUsed: "yellow",
        isWinner: false,
      },
      {
        id: "Xv0CowVMvL38KVDkb3bh7",
        name: "Row 3 Col 4",
        row: 3,
        column: 4,
        isClicked: true,
        playerUsed: "red",
        isWinner: false,
      },
      {
        id: "ACwmGGt88g3WRgN04HEuu",
        name: "Row 3 Col 5",
        row: 3,
        column: 5,
        isClicked: true,
        playerUsed: "red",
        isWinner: false,
      },
      {
        id: "O4B60gQ2_0CmAXhkfd6WM",
        name: "Row 3 Col 6",
        row: 3,
        column: 6,
        isClicked: true,
        playerUsed: "red",
        isWinner: false,
      },
    ],
    [
      {
        id: "uqJGcN7y4_fNQ-W8fmN_B",
        name: "Row 4 Col 0",
        row: 4,
        column: 0,
        isClicked: true,
        playerUsed: "yellow",
        isWinner: false,
      },
      {
        id: "qxr32E00_jd3jfIv4E24d",
        name: "Row 4 Col 1",
        row: 4,
        column: 1,
        isClicked: true,
        playerUsed: "red",
        isWinner: false,
      },
      {
        id: "3WubRoV8zCBHsiV7vB0gS",
        name: "Row 4 Col 2",
        row: 4,
        column: 2,
        isClicked: true,
        playerUsed: "red",
        isWinner: false,
      },
      {
        id: "froIWk2A0z68rSeEHKeSh",
        name: "Row 4 Col 3",
        row: 4,
        column: 3,
        isClicked: true,
        playerUsed: "red",
        isWinner: false,
      },
      {
        id: "Rls4tcMYy1789XjG42a8M",
        name: "Row 4 Col 4",
        row: 4,
        column: 4,
        isClicked: true,
        playerUsed: "yellow",
        isWinner: false,
      },
      {
        id: "gyhzIUbZvlWo4JbH05zx4",
        name: "Row 4 Col 5",
        row: 4,
        column: 5,
        isClicked: true,
        playerUsed: "yellow",
        isWinner: false,
      },
      {
        id: "QH0_muQKrgoav2jt_VO1b",
        name: "Row 4 Col 6",
        row: 4,
        column: 6,
        isClicked: true,
        playerUsed: "yellow",
        isWinner: false,
      },
    ],
    [
      {
        id: "iFiVzPmH2gba6TY4XbolR",
        name: "Row 5 Col 0",
        row: 5,
        column: 0,
        isClicked: true,
        playerUsed: "red",
        isWinner: false,
      },
      {
        id: "cK0wWbA8iovx3SlCnHPCD",
        name: "Row 5 Col 1",
        row: 5,
        column: 1,
        isClicked: true,
        playerUsed: "yellow",
        isWinner: false,
      },
      {
        id: "OP2OAKaaV7vW7Du8PRWPg",
        name: "Row 5 Col 2",
        row: 5,
        column: 2,
        isClicked: true,
        playerUsed: "yellow",
        isWinner: false,
      },
      {
        id: "yytsl2bsdZOIp7eCT6BPJ",
        name: "Row 5 Col 3",
        row: 5,
        column: 3,
        isClicked: true,
        playerUsed: "yellow",
        isWinner: false,
      },
      {
        id: "WsL-EsRl9GYH-8SjWR5tp",
        name: "Row 5 Col 4",
        row: 5,
        column: 4,
        isClicked: true,
        playerUsed: "red",
        isWinner: false,
      },
      {
        id: "Eg3PFXhUDH2S_pnDBVR7N",
        name: "Row 5 Col 5",
        row: 5,
        column: 5,
        isClicked: true,
        playerUsed: "red",
        isWinner: false,
      },
      {
        id: "aI42ryWPzdmiC84Pin9qt",
        name: "Row 5 Col 6",
        row: 5,
        column: 6,
        isClicked: true,
        playerUsed: "red",
        isWinner: false,
      },
    ],
  ];
  const printBoard = druk.map((row, rowId) =>
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
  const printBoards = boardState.map((row, rowId) =>
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
    left: markerDistance,
  };

  return (
    <div className="relative mx-auto flex justify-center col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-1">
      <Image
        src={currentImage.front}
        alt="game board"
        className="absolute z-[4]"
      />

      {windowWidth > 1023 && !gameStates.isGameOver && (
        <Image
          style={dystans}
          src={
            gameStates.currentPlayerTurn === "red" ? markerRed : markerYellow
          }
          className={`absolute top-[-31px]`}
          alt=" "
        />
      )}

      <div
        className="z-[] mt-1 grid gap-x-[5.5px] grid-cols-[repeat(7,42px)] grid-rows-[repeat(6,64px)]  
sm:grid-cols-[repeat(7,64px)] w-[336px] sm:w-[632px] sm:ml-[37.5px] sm:mt-4 sm:gap-[24.5px]"
      >
        {printBoard}
      </div>
    </div>
  );
};
export default Board;
