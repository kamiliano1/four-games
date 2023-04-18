import React, { useEffect, useState } from "react";
import counterRedSmall from "../../../public/images/counter-red-small.svg";
import counterRedBig from "../../../public/images/counter-red-large.svg";
import counterYellowSmall from "../../../public/images/counter-yellow-small.svg";
import counterYellowBig from "../../../public/images/counter-yellow-large.svg";
import Image, { StaticImageData } from "next/image";
import useWindowWith from "../../hooks/useWindowWith";
import { motion } from "framer-motion";
import { BoardFieldStateType } from "../../atoms/boardAtom";

type SingleFieldProps = {
  name: string;
  id: string;
  row: number;
  column: number;
  isClicked: boolean;
  playerUsed: "none" | "red" | "yellow";
  isWinner: boolean;
  field: (id: string, isClicked: boolean, column: number) => void;
  currentField: BoardFieldStateType[];
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

  const windowWidth = useWindowWith();
  const [currentImage, setCurrentImage] = useState<picturesType>({
    bigRed: counterRedBig,
    smallRed: counterRedSmall,

    bigYellow: counterYellowBig,
    smallYellow: counterYellowSmall,
  });

  const [images, setImages] = useState<StaticImageData>(currentImage.bigRed);

  useEffect(() => {
    if (playerUsed === "red") {
      setImages(currentImage.smallRed);
    } else if (playerUsed === "yellow") {
      setImages(currentImage.smallYellow);
    }
    if (windowWidth > 767) {
      if (playerUsed === "red") {
        setImages(currentImage.bigRed);
      } else if (playerUsed === "yellow") {
        setImages(currentImage.bigYellow);
      }
    }
  }, [
    windowWidth,
    currentField,
    playerUsed,
    currentImage.smallRed,
    currentImage.smallYellow,
    currentImage.bigRed,
    currentImage.bigYellow,
  ]);

  return (
    <div className="inline relative">
      {isClicked ? (
        <div className="inline relative z-[-5]">
          <motion.div
            initial={{ y: -500 }}
            animate={{ y: 0 }}
            transition={{ ease: "easeOut", duration: 0.7 }}
          >
            <Image src={images} alt="" />
          </motion.div>
          {isWinner && (
            <span
              className="absolute top-[12px] left-[10.5px] 
            flex border-[6px] border-white rounded-full aspect-square 
            items-start w-[20px] sm:w-[34px] sm:left-[17px] sm:top-[17px] "
            ></span>
          )}
        </div>
      ) : (
        <>
          {windowWidth > 768 ? (
            <span
              className="cursor-pointer w-[75px] aspect-square inline-block rounded-full "
              onClick={() => field(id, isClicked, column)}
              onMouseEnter={() => currentHoverColumn(column)}
              onMouseLeave={() => currentHoverColumn(-1000)}
            ></span>
          ) : (
            <span
              className="cursor-pointer w-[33.95px] aspect-square inline-block rounded-full "
              onClick={() => field(id, isClicked, column)}
            ></span>
          )}
        </>
      )}
    </div>
  );
};
export default SingleField;
