import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import SingleField from "./SingleField";
import { motion } from "framer-motion";
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
    console.log(preparedBoard);
  }, []);

  useEffect(() => {
    checkRows();
    checkColumns();
    // checkDiagonals();
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
    if (arrayToCheck.length === 7) {
      let whitePlayerScore = 0;
      let redPlayerScore = 0;
      let whiteWinnerArray: string[] = [];
      let redWinnerArray: string[] = [];

      arrayToCheck.map((field: BoardFieldProps) => {
        if (field.playerUsed === "white") {
          whitePlayerScore++;
          whiteWinnerArray.push(field.id);

          // setWinnerFieldId((prev: BoardFieldProps[]) => {
          //   return prev.find((item) => item.id === field.id)
          //     ? prev
          //     : [...prev, field];
          // });
          // setWinnerFieldId((prev: BoardFieldProps[]) =>
          //   prev.sort((a, b) => (a.column > b.column ? 1 : -1))
          // );

          if (whitePlayerScore >= 4) {
            setWinner("white");
            setWinnerFieldId(whiteWinnerArray);
          }

          return;
        } else {
          whitePlayerScore = 0;
          whiteWinnerArray = [];
        }

        if (field.playerUsed === "red") {
          redPlayerScore++;
          redWinnerArray.push(field.id);
          if (redPlayerScore === 4) {
            setWinnerFieldId(redWinnerArray);
            setWinner("red");
          }
          return;
        } else {
          redPlayerScore = 0;
          redWinnerArray;
        }
      });
    }
  };

  const checkColumns = () => {
    const columnIndex = [0, 1, 2, 3, 4, 5, 6];
    columnIndex.map((columnId) => {
      const columnFieldArray: BoardFieldProps[] = [];
      preparedBoard.filter((item) => {
        return item.filter((field: BoardFieldProps) => {
          if (field.column === columnId) columnFieldArray.push(field);
          checkWinner(columnFieldArray);
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
    const diagonalArrayEnd: BoardFieldProps[] = [];
    const diagonalArray: BoardFieldProps[] = [];

    // const rowStartIndex = [0, 0, 0, 0, 1, 2, 3];
    // const colStartIndex = [0, 1, 2, 3, 0, 0, 0];
    // rowStartIndex.map((rowIndex, index) => {
    //   let startRow = rowStartIndex[index];
    //   let startCol = colStartIndex[index];
    //   preparedBoard.filter((item, id: number) => {
    //     item.filter((field: BoardFieldProps, col: number) => {
    //       if (
    //         startRow + index <= preparedBoard.length &&
    //         startCol + index <= preparedBoard.length
    //       ) {
    //         // console.log(
    //         //   field.row,
    //         //   "start Row",
    //         //   startRow + index,
    //         //   "||",
    //         //   field.column,
    //         //   "start Col",
    //         //   startCol + index
    //         // );
    //         if (
    //           field.row === startRow + index &&
    //           field.column === startRow + index
    //         )
    //           diagonalArrayTestowa.push(field);
    //       }
    //       checkWinner(diagonalArrayTestowa);
    //       console.log(diagonalArrayTestowa);
    //     });
    //   });
    // });
    // preparedBoard.filter((item, id: number) =>
    //   item.filter((field: BoardFieldProps, col: number) => {
    //     let startRow = rowStartIndex[id];
    //     let startCol = colStartIndex[id];
    //     if (field.row === field.column) diagonalArray.push(field);
    //     if (
    //       startRow + col <= preparedBoard.length &&
    //       startCol + col <= preparedBoard.length
    //     ) {
    //       // console.log(
    //       //   field.row,
    //       //   "start Row",
    //       //   startRow + col,
    //       //   "||",
    //       //   field.column,
    //       //   "start Col",
    //       //   startCol + col
    //       // );

    //       if (field.row === startCol + col && field.column === startRow + col)
    //         diagonalArrayTestowa.push(field);
    //     }

    //     // console.log(id, "row", col, "col");

    //     if (field.row === id && field.column === preparedBoard.length - id - 1)
    //       diagonalArrayEnd.push(field);
    //     checkWinner(diagonalArray);
    //     checkWinner(diagonalArrayEnd);
    //     checkWinner(diagonalArrayTestowa);
    //     // console.log(diagonalArrayTestowa, "diag");
    //   })
    // );
    const rowStartIndex = [0, 0, 0, 0, 1, 2, 3];
    const colStartIndex = [0, 1, 2, 3, 0, 0, 0];
    const licznkik = [0, 1, 2, 3, 4, 5, 6];
    const diagonalArrayTestowa: BoardFieldProps[] = [];
    preparedBoard.filter((item, row: number) => {
      let startRow = rowStartIndex[row];
      console.log(startRow + row);

      item.filter((field: BoardFieldProps, col: number) => {
        let startCol = colStartIndex[col];
        // console.log(row, "row", col, "col", field.name);
        if (field.row === startRow + row && field.column === startCol) {
          diagonalArrayTestowa.push(field.id);
        }
      });
    });
    // console.log(diagonalArrayTestowa, "diag");
    setPreparedBoard((prev) =>
      prev.map((item) =>
        item.map((field: BoardFieldProps) => {
          return diagonalArrayTestowa.includes(field.id)
            ? { ...field, isWinner: true }
            : field;
        })
      )
    );
  };

  const clickField = (
    id: string,
    isClicked: boolean,
    fieldCol: number,
    fieldRow: number
  ) => {
    if (isClicked) return;

    const columnFieldArray: BoardFieldProps[] = [];
    preparedBoard.filter((item) => {
      return item.filter((field: BoardFieldProps) => {
        if (field.column === fieldCol) columnFieldArray.push(field);
      });
    });

    // const lastEmptyIndexColumn = columnFieldArray.findLastIndex(
    //   (item: BoardFieldProps) => {
    //     return item.isClicked === false;
    //   }
    // );
    // const lastEmptyId = columnFieldArray[lastEmptyIndexColumn].id;
    // setPreparedBoard((item) =>
    //   item.map((row) =>
    //     row.map((col: BoardFieldProps) => {
    //       return col.id === lastEmptyId
    //         ? { ...col, isClicked: true, playerUsed: currentPlayerTurn }
    //         : col;
    //     })
    //   )
    // );

    setPreparedBoard((item) =>
      item.map((row) =>
        row.map((col: BoardFieldProps) => {
          return col.id === id
            ? { ...col, isClicked: true, playerUsed: currentPlayerTurn }
            : col;
        })
      )
    );
    // console.log(fieldRow, fieldCol);

    // checkRows();
    // swichtPlayerTurn();
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
      <motion.div
        animate={{ x: 30, y: yOdleglosc }}
        transition={{ type: "spring", stiffness: 100, duration: 1 }}
      >
        <h1 className="text-4xl text-red-500">Test</h1>
      </motion.div>
      {printBoard}
      <button
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
      </button>
    </div>
  );
};
export default Board;
