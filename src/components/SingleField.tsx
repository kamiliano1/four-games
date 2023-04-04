import React, { CSSProperties } from "react";

type SingleFieldProps = {
  name: string;
  id: string;
  row: number;
  column: number;
  isClicked: boolean;
  playerUsed: "none" | "red" | "white";
  isWinner: boolean;
  field: (id: string, isClicked: boolean, column: number) => void;
};

const SingleField: React.FC<SingleFieldProps> = ({
  id,
  column,
  row,
  isClicked,
  playerUsed,
  isWinner,
  field,
}) => {
  let fieldBackground = "black";
  if (isWinner) {
    fieldBackground = "pink";
  } else if (playerUsed === "red") {
    fieldBackground = "red";
  } else if (playerUsed === "white") {
    fieldBackground = "green";
  }
  const styles: CSSProperties = {
    backgroundColor: fieldBackground,
  };

  return (
    <>
      <button
        style={styles}
        onClick={() => field(id, isClicked, column)}
        className="p-5 "
      >{`R ${row + 1} C ${column + 1}`}</button>
      {column === 6 && <br />}
    </>
  );
};
export default SingleField;
