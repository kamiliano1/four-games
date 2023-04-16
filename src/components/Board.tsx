import { nanoid } from "nanoid";
import Image, { StaticImageData } from "next/image";
import React, { CSSProperties, useEffect, useState } from "react";
import SingleField from "./SingleField";
import { useRecoilState } from "recoil";
import backBoardLayerLarge from "../../public/images/board-layer-black-large.svg";
import backBoardLayerSmall from "../../public/images/board-layer-black-small.svg";
import frontBoardLayerLarge from "../../public/images/board-layer-white-large.svg";
import frontBoardLayerSmall from "../../public/images/board-layer-white-small.svg";
import markerRed from "../../public/images/marker-red.svg";
import markerYellow from "../../public/images/marker-yellow.svg";
import { BoardFieldStateType, boardFieldState } from "../atoms/boardAtom";
import { gameState } from "../atoms/gameAtom";
import useWindowWith from "../hooks/useWindowWith";

type PlayerColor = "red" | "yellow" | "none";

const Board: React.FC = () => {
  const [boardState, setBoardState] = useRecoilState(boardFieldState);
  const [gameStates, setGameStates] = useRecoilState(gameState);
  const [markerDistance, setMarkerDistance] = useState<number>(0);
  const [winnerFieldId, setWinnerFieldId] = useState<string[]>([]);
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
  const windowWidth = useWindowWith();
  const [currentImage, setCurrentImage] = useState<picturesType>({
    front: frontBoardLayerSmall,
    back: backBoardLayerSmall,
  });

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
  }, [setBoardState]);

  useEffect(() => {
    let currentUsedFields = 0;
    boardState.map((row) =>
      row.map((field: BoardFieldStateType) =>
        field.isClicked ? currentUsedFields++ : ""
      )
    );
    gameStates.winnerPlayer;
    if (
      currentUsedFields === 42 &&
      gameStates.winnerPlayer !== "Player 1" &&
      gameStates.winnerPlayer !== "Player 2"
    )
      setGameStates((prev) => ({
        ...prev,
        isGameOver: true,
        winnerPlayer: "Tie",
      }));
  }, [boardState, gameStates.winnerPlayer, setGameStates]);

  useEffect(() => {
    if (gameStates.yellowPlayerRemainingTime === 0)
      setGameStates((prev) => ({
        ...prev,
        redPlayerScore: prev.redPlayerScore + 1,
      }));
    if (gameStates.redPlayerRemainingTime === 0)
      setGameStates((prev) => ({
        ...prev,
        yellowPlayerScore: prev.yellowPlayerScore + 1,
      }));
  }, [
    gameStates.redPlayerRemainingTime,
    gameStates.yellowPlayerRemainingTime,
    setGameStates,
  ]);
  useEffect(() => {
    setMarkerDistance(35 + currentColumnHover * 88.06);
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
              setWinnerFieldId(whiteWinnerArray);
              setGameStates((prev) => ({
                ...prev,
                isGameOver: true,
                winnerPlayer: "Player 2",
                redPlayerRemainingTime: 0,
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
              setWinnerFieldId(redWinnerArray);

              setGameStates((prev) => ({
                ...prev,
                isGameOver: true,
                winnerPlayer: "Player 1",
                yellowPlayerRemainingTime: 0,
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
  }, [boardState, gameStates.isGameOver, setGameStates]);

  useEffect(() => {
    const setWinnerField = () => {
      setTimeout(() => {
        setBoardState((prev) =>
          prev.map((item) =>
            item.map((field: BoardFieldStateType) => {
              return winnerFieldId.includes(field.id)
                ? { ...field, isWinner: true }
                : field;
            })
          )
        );
      }, 1000);
    };
    setWinnerField();
  }, [gameStates.isPaused, setBoardState, winnerFieldId]);
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
  const userMarkerDistance: CSSProperties = {
    left: markerDistance,
  };

  return (
    <div className="relative mx-auto flex justify-center col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-1">
      <Image
        src={currentImage.front}
        alt="game board"
        className="absolute z-[-4]"
      />
      <Image
        src={currentImage.back}
        alt="game board"
        className="absolute z-[-6]"
      />

      {windowWidth > 1023 && !gameStates.isGameOver && markerDistance > 0 && (
        <Image
          style={userMarkerDistance}
          src={
            gameStates.currentPlayerTurn === "red" ? markerRed : markerYellow
          }
          className={`absolute top-[-31px]`}
          alt=" "
        />
      )}
      <div
        onMouseLeave={() => setCurrentColumnHover(-1)}
        className="overflow-hidden mt-1 grid pl-[7px] gap gap-y-[6px] grid-rows-[repeat(6,41px)] grid-cols-[repeat(7,47px)] sm:grid-rows-[repeat(6,65px)]  
sm:grid-cols-[repeat(7,68.56px)] w-[336px] sm:w-[632px] sm:pl-[18.5px] sm:mt-4 sm:gap-x-[19.5px] sm:gap-y-[24px]"
      >
        {printBoard}
      </div>
    </div>
  );
};
export default Board;
