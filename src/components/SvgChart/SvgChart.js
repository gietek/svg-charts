import React from "react";
import { lineCommand, bezierCommand, SvgChartType } from "./helpers";

const trendColor = {
  positive: "#00FFE0",
  negative: "#ED5252",
  neutral: "#373C62",
};

const getTrendColor = (values) => {
  const firstValue = values[0];
  const lastValue = values[values.length - 1];

  if (firstValue === lastValue) {
    return trendColor.neutral;
  }

  return firstValue > lastValue ? trendColor.negative : trendColor.positive;
};

export const SvgChart = ({
  width,
  height,
  values,
  type = SvgChartType.smooth,
}) => {
  const stepWidth = width / (values.length - 1);
  const maxY = Math.max(...values);
  const color = getTrendColor(values);
  const marginY = maxY * 0.1;

  const getY = (value) =>
    Math.round(height - (value / (maxY + marginY)) * height);

  const points = values.map((value, index) => {
    const x = Math.round(stepWidth * index);
    const y = getY(value);

    return [x, y];
  });

  const calculatePath = (points, command) => {
    return points.reduce((acc, point, index, arr) => {
      if (index === 0) {
        return `M ${point[0]} ${point[1]}`;
      }

      return `${acc} ${command(point, index, arr)}`;
    }, "");
  };

  const path = calculatePath(
    points,
    type === SvgChartType.smooth ? bezierCommand : lineCommand
  );

  const id = `linearGradient${Math.random()}${Date.now()}`;

  return (
    <div className="svg-chart">
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="0" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>
        </defs>
        <path d={path} stroke={color} fill="none" />
        <path
          d={`${path} L ${width} ${height} L 0 ${height}`}
          stroke="none"
          fill={`url(#${id})`}
          opacity={0.4}
        />
      </svg>
    </div>
  );
};
