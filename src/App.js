import React from "react";
import { SvgChart } from "./components/SvgChart/SvgChart";

const getRandomValue = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

const getRandomData = () => {
  const arr = [];
  const len = getRandomValue(7, 15);
  for (let i = 0; i < len; i++) {
    arr.push(getRandomValue(10, 150));
  }

  return arr;
};

const colors = ["#373C62", "#00FFE0", "#ED5252", "#373C62"];

export const App = () => {
  return Array.from(Array(200).keys()).map((_, index) => {
    return (
      <SvgChart
        key={index}
        width={40}
        height={20}
        values={getRandomData()}
        color={colors[getRandomValue(0, colors.length - 1)]}
      />
    );
  });
};
