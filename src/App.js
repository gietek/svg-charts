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

const greenValues = [10, 30, 20, 40, 50, 70, 72, 75, 100];
const redValues = [...greenValues].reverse();
const neutralValues = [50, 40, 20, 20, 30, 35, 37, 40, 42, 44, 48, 50];

// eslint-disable-next-line no-unused-vars
const AppFixed = () => {
  const width = 400;
  const height = 200;

  return (
    <>
      <SvgChart
        width={width}
        height={height}
        values={greenValues}
        type="smooth"
      />
      <SvgChart width={width} height={height} values={neutralValues} />
      <SvgChart width={width} height={height} values={redValues} type="sharp" />
    </>
  );
};

// eslint-disable-next-line no-unused-vars
const AppRandom = () => {
  const width = 80;
  const height = 40;

  return Array.from(Array(200).keys()).map((_, index) => {
    return (
      <SvgChart
        key={index}
        width={width}
        height={height}
        values={getRandomData()}
      />
    );
  });
};

export const App = AppRandom;
