import React, { useEffect, useState } from "react";
import * as d3 from "d3";

const LineGraph = ({ formattedData, line, lineColor }) => {
  return (
    <g>
      {/* The actual SVG paths passed from parent */}
      <path
        d={line(formattedData)}
        fill="none"
        stroke={lineColor}
        strokeWidth="2"
      />
    </g>
  );
};
export default LineGraph;
