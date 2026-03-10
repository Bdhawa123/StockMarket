import React, { useState } from "react";
import * as d3 from "d3";

const InteractionLayer = ({ completeDataSet, x, y, width, height, margin }) => {
  const [hover, setHover] = useState(null);

  const onMouseMove = (event) => {
    const [mouseX] = d3.pointer(event);
    const xDate = x.invert(mouseX);
    const bisect = d3.bisector((d) => d.date).center;

    // Find closest points in both datasets
    // const p1 = data1[bisect(data1, xDate)];
    // const p2 = data2 && data2.length > 0 ? data2[bisect(data2, xDate)] : null;

    const activePoints = completeDataSet.map((dataSet, index) => {
      const i = bisect(dataSet, xDate);
      return {
        data: dataSet[i],
        color: "black",
      };
    });

    if (activePoints.length > 0) {
      setHover({
        points: activePoints,
        xPos: x(activePoints[0].data.date), // Snap to the date
      });
    }
  };

  return (
    <g>
      {hover && (
        <g pointerEvents="none">
          {/* Vertical Guide Line */}
          <line
            x1={hover.xPos}
            x2={hover.xPos}
            y1={margin.marginTop}
            y2={height - margin.marginBottom}
            stroke="#ccc"
            strokeDasharray="4"
          />

          {hover.points.map(
            (p, i) =>
              p.data && (
                <circle
                  key={i}
                  cx={hover.xPos}
                  cy={y(p.data.price)}
                  r={5}
                  fill={p.color}
                  stroke="white"
                  strokeWidth="2"
                />
              ),
          )}
          <g
            transform={`translate(${hover.xPos > width / 2 ? hover.xPos - 140 : hover.xPos + 15}, ${margin.marginTop + 10})`}
          >
            <rect
              width="130"
              height="65"
              fill="white"
              stroke="#ccc"
              rx="4"
              fillOpacity="0.9"
            />
            {hover.points.map((p, i) => (
              <text key={i} x="10" y={40 + i * 15} fontSize="11" fill={p.color}>
                Stock {i + 1}: ${p.data.price.toFixed(2)}
              </text>
            ))}
          </g>
        </g>
      )}

      {/* The ONE and ONLY invisible rectangle for mouse capture */}
      <rect
        x={margin.marginLeft}
        y={margin.marginTop}
        width={width - margin.marginLeft - margin.marginRight}
        height={height - margin.marginTop - margin.marginBottom}
        fill="transparent"
        style={{ pointerEvents: "all" }}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setHover(null)}
      />
    </g>
  );
};

export default InteractionLayer;
