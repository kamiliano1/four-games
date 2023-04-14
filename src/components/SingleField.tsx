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
  playerUsed: "none" | "red" | "yellow";
  isWinner: boolean;
};

type SingleFieldProps = {
  name: string;
  id: string;
  row: number;
  column: number;
  isClicked: boolean;
  playerUsed: "none" | "red" | "yellow";
  isWinner: boolean;
  field: (id: string, isClicked: boolean, column: number) => void;
  currentField: BoardFieldProps[];
  currentHoverColumn: (column: number) => void;
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
  currentHoverColumn,
}) => {
  type picturesType = {
    bigRed: StaticImageData;
    smallRed: StaticImageData;
    bigYellow: StaticImageData;
    smallYellow: StaticImageData;
  };
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<picturesType>({
    bigRed: counterRedBig,
    // bigRed: counterRedSmall,
    smallRed: counterRedSmall,
    bigYellow: counterYellowBig,
    // bigYellow: counterYellowSmall,
    smallYellow: counterYellowSmall,
  });

  const [images, setImages] = useState<StaticImageData>(currentImage.bigRed);
  const [currentColumnHover, setCurrentColumnHover] = useState<number>(-1);
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
    if (playerUsed === "red") {
      setImages(currentImage.smallRed);
    } else if (playerUsed === "yellow") {
      setImages(currentImage.smallYellow);
    }
    if (windowWidth > 737) {
      if (playerUsed === "red") {
        setImages(currentImage.bigRed);
        fieldBackground = "red";
      } else if (playerUsed === "yellow") {
        setImages(currentImage.bigYellow);
        fieldBackground = "blue";
      }
      // console.log(currentField, "field");

      // console.log(images);

      // return;
    }
  }, [windowWidth, currentField]);

  if (isWinner) {
    fieldBackground = "pink";
  } else if (playerUsed === "red") {
    fieldBackground = "red";
  } else if (playerUsed === "yellow") {
    fieldBackground = "green";
  }
  // const styles: CSSProperties = {
  //   backgroundColor: fieldBackground,
  //   border: "6px solid #FFFFFF",
  //   position: "absolute",
  //   borderRadius: "50%",
  // };

  return (
    <div className="inline relative">
      {isClicked ? (
        <div className="inline relative z-[30]">
          <Image src={images} alt="" />
          {isWinner && (
            <span className="absolute top-[10px] left-[11.5px] flex border-[6px] border-white rounded-full aspect-square items-start w-[20px] sm:w-[34px] sm:left-[18px] sm:top-[16px] "></span>
          )}
        </div>
      ) : (
        <>
          {windowWidth > 700 ? (
            <span
              className="cursor-pointer w-[75px] aspect-square inline-block rounded-full "
              onClick={() => field(id, isClicked, column)}
              onMouseEnter={() => currentHoverColumn(column)}
              onMouseLeave={() => currentHoverColumn(-1)}
            ></span>
          ) : (
            <span
              className="cursor-pointer w-[33.95px] aspect-square inline-block rounded-full "
              onClick={() => field(id, isClicked, column)}
              onMouseEnter={() => currentHoverColumn(column)}
              onMouseLeave={() => currentHoverColumn(-1)}
            ></span>
          )}
        </>
      )}
      <div></div>
    </div>
  );
};
export default SingleField;
