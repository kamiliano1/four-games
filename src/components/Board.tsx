import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import SingleField from "./SingleField";
import { motion } from "framer-motion";
// import PlayVersus from "../Layout/Buttons/PlayVersus";
// import ContinueEndGame from "../Layout/Buttons/ContinueEndGame";
import MenuButton from "../Layout/Buttons/MenuButton";
import AcceptButton from "../Layout/Buttons/AcceptButton";
type BoardProps = {};

type BoardFieldProps = {
  id: string;
  name: string;
  row: number;
  column: number;
  isClicked: boolean;
  playerUsed: "none" | "red" | "white";
  isWinner: boolean;
};

type PlayerColor = "red" | "white" | "none";

const Board: React.FC<BoardProps> = () => {
  const [currentPlayerTurn, setCurrentPlayerTurn] =
    useState<PlayerColor>("white");

  const [preparedBoard, setPreparedBoard] = useState(
    new Array(7).fill(new Array(7).fill("") as BoardFieldProps[])
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [whiteScore, setWhiteScore] = useState<number>(1);
  const [winner, setWinner] = useState<PlayerColor>("none");
  const [winnerFieldId, setWinnerFieldId] = useState<string[]>([]);
  const [firstElement, setFirstElement] = useState<number>(0);
  const [yOdleglosc, setYOdleglosc] = useState(0);
  const swichtPlayerTurn = () => {
    setCurrentPlayerTurn((prev) => (prev === "white" ? "red" : "white"));
  };

  // useEffect(() => {
  //   console.log(whitePlayerScore);
  // }, [whitePlayerScore]);
  useEffect(() => {
    setPreparedBoard((item) =>
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
    // console.log(preparedBoard);
  }, []);

  useEffect(() => {
    checkRows();
    checkColumns();
    checkDiagonals();
  }, [preparedBoard]);
  const resetField = () => {
    setPreparedBoard((item) =>
      item.map((row, rowId) =>
        row.map((col: number, colId: number) => ({
          id: nanoid(),
          name: `Row ${rowId} Col ${colId}`,
          row: rowId,
          column: colId,
          isClicked: false,
          playerUsed: "none",
        }))
      )
    );
    setWinner("none");
    setWinnerFieldId([]);
  };

  useEffect(() => {
    console.log(winner);

    setPreparedBoard((prev) =>
      prev.map((item) =>
        item.map((field: BoardFieldProps) => {
          return winnerFieldId.includes(field.id)
            ? { ...field, isWinner: true }
            : field;
        })
      )
    );
  }, [winner]);

  const checkWinner = (arrayToCheck: BoardFieldProps[]) => {
    // console.log(arrayToCheck);

    if (arrayToCheck.length) {
      let whitePlayerScore = 0;
      let redPlayerScore = 0;
      let whiteWinnerArray: string[] = [];
      let redWinnerArray: string[] = [];

      arrayToCheck.map((field: BoardFieldProps) => {
        if (field.playerUsed === "white") {
          whitePlayerScore++;
          whiteWinnerArray.push(field.id);

          if (whitePlayerScore >= 4) {
            setWinner("white");
            setWinnerFieldId(whiteWinnerArray);
          }

          return;
        } else {
          whitePlayerScore = 0;
          whiteWinnerArray = [];
        }
      });
      //   if (field.playerUsed === "white") {
      //     whitePlayerScore++;
      //     whiteWinnerArray.push(field.id);

      //     if (whitePlayerScore >= 4) {
      //       setWinner("white");
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
      arrayToCheck.map((field: BoardFieldProps) => {
        if (field.playerUsed === "red") {
          redPlayerScore++;
          redWinnerArray.push(field.id);

          if (redPlayerScore >= 4) {
            setWinner("red");
            setWinnerFieldId(redWinnerArray);
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
      const diagonalFieldArray: BoardFieldProps[] = [];
      preparedBoard.filter((item) => {
        return item.filter((field: BoardFieldProps) => {
          if (field.column === columnId) diagonalFieldArray.push(field);
          checkWinner(diagonalFieldArray);
        });
      });
    });
  };
  const checkRows = () => {
    preparedBoard.map((rows) => {
      checkWinner(rows);
    });
  };

  const checkDiagonals = () => {
    const rowCounter = [-4, -3, -2, -1, 0, 1, 2, 3];

    rowCounter.map((columnId) => {
      const diagonalFieldArray: BoardFieldProps[] = [];
      const diagonalFieldArrayOne: BoardFieldProps[] = [];
      const diagonalFieldArrayTwo: BoardFieldProps[] = [];
      preparedBoard.filter((item, row: number) => {
        return item.filter((field: BoardFieldProps, col: number) => {
          if (field.row === row && field.column === row + columnId)
            diagonalFieldArray.push(field);
          checkWinner(diagonalFieldArray);
          if (field.row === col + columnId && field.column === col) {
            diagonalFieldArrayOne.push(field);
            checkWinner(diagonalFieldArrayOne);
          }

          if (
            field.row === row &&
            field.column === preparedBoard.length - row + columnId
          ) {
            diagonalFieldArrayTwo.push(field);
            checkWinner(diagonalFieldArrayTwo);
          }
        });
      });
    });
    // console.log(diagonalArrayTestowa, "diag");
    // setPreparedBoard((prev) =>
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
    if (isClicked) return;

    const diagonalFieldArray: BoardFieldProps[] = [];
    preparedBoard.filter((item) => {
      return item.filter((field: BoardFieldProps) => {
        if (field.column === fieldCol) diagonalFieldArray.push(field);
      });
    });

    const lastEmptyIndexColumn = diagonalFieldArray.findLastIndex(
      (item: BoardFieldProps) => {
        return item.isClicked === false;
      }
    );
    const lastEmptyId = diagonalFieldArray[lastEmptyIndexColumn].id;
    setPreparedBoard((item) =>
      item.map((row) =>
        row.map((col: BoardFieldProps) => {
          return col.id === lastEmptyId
            ? { ...col, isClicked: true, playerUsed: currentPlayerTurn }
            : col;
        })
      )
    );

    // setPreparedBoard((item) =>
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
    swichtPlayerTurn();
  };
  const printBoard = preparedBoard.map((row, rowId) =>
    row.map((col: BoardFieldProps, colId: number) => {
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
        />
      );
    })
  );

  return (
    <div>
      {/* <PlayVersus type="vsPlayer" />
      <PlayVersus type="vsCPU" />
      <ContinueEndGame type="ContinueGame" />
      <ContinueEndGame type="QuitGame" /> */}

      {/* <Menu /> */}
      <motion.div
        animate={{ x: 30, y: yOdleglosc }}
        transition={{ type: "spring", stiffness: 100, duration: 1 }}>
        <h1 className="text-4xl text-red-500">Test</h1>
      </motion.div>
      {printBoard}
      <button
        style={{ margin: "2rem", background: "teal" }}
        onClick={checkRows}>
        Sprawdz wiersze
      </button>
      <button
        style={{ margin: "2rem", background: "teal" }}
        onClick={checkColumns}>
        Sprawdz kolumny
      </button>
      <button
        style={{ margin: "2rem", background: "teal" }}
        onClick={checkDiagonals}>
        Sprawdz przekatne
      </button>
      <button
        style={{ margin: "2rem", background: "teal" }}
        onClick={resetField}>
        Reset
      </button>
      <button
        style={{ margin: "2rem", background: "teal" }}
        onClick={swichtPlayerTurn}>
        Zmiana gracza
      </button>
      <button
        style={{ margin: "2rem", background: "teal" }}
        onClick={() => setYOdleglosc((prev) => prev + 30)}>
        Zwieksz yOdleglosc
      </button>
    </div>
  );
};
export default Board;
