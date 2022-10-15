import React from "react";

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

export const SvgChart = ({ width, height, values }) => {
  const stepWidth = width / (values.length - 1);
  const maxY = Math.max(...values);
  const color = getTrendColor(values);

  const getY = (value) => Math.round(height - (value / maxY) * height);

  const path = values
    .map((value, index) => {
      const command = index === 0 ? "M" : "L";
      const x = Math.round(stepWidth * index);
      const y = getY(value);
      return `${command} ${x} ${y}`;
    })
    .join(" ");

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
