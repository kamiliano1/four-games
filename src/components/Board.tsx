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
    setMarkerDistance(30 + currentColumnHover * 90);
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
  };

  const currentHoverColumn = (column: number) => {
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

      <div
        className="z-[30] ml-2 mt-1 grid gap-x-[5.5px] grid-cols-[repeat(7,42px)] grid-rows-6  
sm:grid-cols-[repeat(7,75px)] w-[336px] sm:w-[630px] sm:mt-5 sm:ml-9 sm:gap-[12.5px]"
      >
        {printBoard}
      </div>
    </div>
  );
};
export default Board;
