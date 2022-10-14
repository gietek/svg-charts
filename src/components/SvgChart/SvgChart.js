import React, { useCallback, useMemo } from "react";

export const SvgChart = ({ width, height, color, values }) => {
  const stepWidth = width / (values.length - 1);
  const maxY = Math.max(...values);

  const getY = useCallback(
    (value) => Math.round(height - (value / maxY) * height),
    [height, maxY]
  );

  const path = useMemo(() => {
    const arr = [`M 0 ${getY(values[0])}`];

    for (let i = 1; i < values.length; i++) {
      const x = Math.round(stepWidth * i);
      const y = getY(values[i]);
      arr.push(`L ${x} ${y}`);
    }

    return arr.join(" ");
  }, [getY, stepWidth, values]);

  const id = `linear${Math.random()}${Date.now()}`;

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
