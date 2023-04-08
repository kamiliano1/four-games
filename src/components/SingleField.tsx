import React, { CSSProperties, useEffect, useState } from "react";
import counterRedSmall from "../../public/images/counter-red-small.svg";
import counterRedBig from "../../public/images/counter-red-large.svg";
import counterYellowSmall from "../../public/images/counter-yellow-small.svg";
import counterYellowBig from "../../public/images/counter-yellow-large.svg";
import Image, { StaticImageData } from "next/image";
type BoardFieldProps = {
  id: string;
  name: string;
  row: number;
  column: number;
  isClicked: boolean;
  playerUsed: "none" | "red" | "white";
  isWinner: boolean;
};

type SingleFieldProps = {
  name: string;
  id: string;
  row: number;
  column: number;
  isClicked: boolean;
  playerUsed: "none" | "red" | "white";
  isWinner: boolean;
  field: (id: string, isClicked: boolean, column: number) => void;
  currentField: BoardFieldProps[];
};

const SingleField: React.FC<SingleFieldProps> = ({
  id,
  column,
  row,
  isClicked,
  playerUsed,
  isWinner,
  field,
  currentField,
}) => {
  type picturesType = {
    bigRed: StaticImageData;
    smallRed: StaticImageData;
    bigYellow: StaticImageData;
    smallYellow: StaticImageData;
  };
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<picturesType>({
    // bigRed: counterRedBig,
    bigRed: counterRedSmall,
    smallRed: counterRedSmall,
    // bigYellow: counterYellowBig,
    bigYellow: counterYellowSmall,
    smallYellow: counterYellowSmall,
  });

  const [images, setImages] = useState<StaticImageData>(currentImage.bigRed);
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
  let fieldBackground = "black";
  useEffect(() => {
    if (windowWidth > 120) {
      if (isWinner) {
        fieldBackground = "pink";
      } else if (playerUsed === "red") {
        setImages(currentImage.bigRed);
        fieldBackground = "red";
      } else if (playerUsed === "white") {
        setImages(currentImage.bigYellow);
        fieldBackground = "blue";
      }
      // console.log(currentField, "field");

      // console.log(images);

      // return;
    }
    // if (isWinner) {
    //   fieldBackground = "pink";
    // } else if (playerUsed === "red") {
    //   setImages(currentImage.smallRed);
    // } else if (playerUsed === "white") {
    //   setImages(currentImage.smallYellow);
    // }
  }, [windowWidth, currentField]);

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
      <Image
        className="cursor-pointer inline mr-[6px]"
        src={images}
        // style={styles}
        alt=""
        onClick={() => field(id, isClicked, column)}
      />
      {/* <button
        // style={styles}
        onClick={() => field(id, isClicked, column)}
        className="p-5  bg-yellow">{`R ${row + 1} C ${column + 1}`}</button> */}
      {column === 6 && <br />}
    </>
  );
};
export default SingleField;
