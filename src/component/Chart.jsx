import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const Chart = ({ ticker, data }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>{data.ticker}</h2>
      {/* Pass the data object to the actual drawing component */}
      <LineChart data={data} />
    </div>
  );
};

const LineChart = ({ data }) => {
  const gx = useRef();
  const gy = useRef();
  const pathRef = useRef();

  const width = 928;
  const height = 900;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  // 1. Transform the Object into a D3-friendly Array
  // Transform the Object into a D3-friendly Array
  const formattedData = Object.entries(data.data).map(([year, price]) => ({
    date: new Date(year, 0, 1), // Sets date to Jan 1st of that year
    price: price,
  }));

  // 2. Scales
  const x = d3.scaleUtc(
    d3.extent(formattedData, (d) => d.date),
    [marginLeft, width - marginRight],
  );

  const y = d3.scaleLinear(
    [0, d3.max(formattedData, (d) => d.price)],
    [height - marginBottom, marginTop],
  );

  // 3. Line Generator
  const line = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.price));

  // 4. Update Axes using useEffect
  useEffect(() => {
    d3.select(gx.current).call(d3.axisBottom(x));
    d3.select(gy.current).call(d3.axisLeft(y));

    d3.select(gx.current).call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0),
    );

    // Y-Axis (Left) with your specific styling
    d3.select(gy.current)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call((g) => g.select(".domain").remove()) // Remove the vertical line
      .call((g) => {
        // Check if the label already exists to avoid appending it multiple times on re-render
        if (g.select(".axis-label").empty()) {
          g.append("text")
            .attr("class", "axis-label")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("↑ Yearly close ($)"); // Changed to "Yearly" to match your data
        }
      });
  }, [data, x, y]);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* X-Axis */}
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />

      {/* Y-Axis */}
      <g ref={gy} transform={`translate(${marginLeft},0)`} />

      {/* The Actual Line */}
      <path
        fill="none"
        stroke="steelblue"
        strokeWidth="1.5"
        d={line(formattedData)}
      />
    </svg>
  );
};

export default Chart;
