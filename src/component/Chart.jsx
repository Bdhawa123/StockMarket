import React, { useRef, useEffect, useState } from "react";
import LineGraph from "./LineGraph";
import InteractionLayer from "./InteractionLayer";
import * as d3 from "d3";

const Chart = ({ data }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>{data.ticker}</h2>
      <LineChart data={data} />
    </div>
  );
};

const LineChart = ({ data }) => {
  const gx = useRef();
  const gy = useRef();
  const combinedDataSet = data;

  const combinedFormattedDataSet = combinedDataSet
    .filter((d) => d && d.data)
    .flatMap((stock) =>
      Object.entries(stock.data).map(([year, price]) => ({
        date: new Date(year, 0, 1),
        price: +price,
      })),
    );

  const combinedArraySet = combinedDataSet
    .filter((d) => d && d.data)
    .map((data) =>
      Object.entries(data.data).map(([year, price]) => ({
        date: new Date(year, 0, 1),
        price: price,
      })),
    );

  console.log(combinedDataSet[0].ticker);

  const width = 928;
  const height = 600;
  const marginTop = 20;
  const marginRight = 45;
  const marginBottom = 30;
  const marginLeft = 40;
  const margin = {
    marginTop: 20,
    marginRight: 45,
    marginBottom: 30,
    marginLeft: 40,
  };

  const x = d3.scaleUtc(
    d3.extent(combinedFormattedDataSet, (d) => d.date),
    [marginLeft, width - marginRight],
  );

  const y = d3.scaleLinear(
    [0, d3.max(combinedFormattedDataSet, (d) => d.price)],
    [height - marginBottom, marginTop],
  );

  // 3. Line Generator
  const line = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.price))
    .curve(d3.curveCardinal);

  const line2 = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.price))
    .curve(d3.curveCardinal);

  // 4. Update Axes using useEffect
  useEffect(() => {
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

  const randomColor = () =>
    `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ maxWidth: "100%", height: "auto" }}
    >
      {/* X-Axis */}
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      {/* Y-Axis */}
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      {/* The Actual Line */}

      {combinedArraySet.map((dataSet, index) => (
        <LineGraph
          key={index}
          formattedData={dataSet}
          line={line}
          lineColor={randomColor()}
        />
      ))}

      <InteractionLayer
        completeDataSet={combinedArraySet}
        x={x}
        y={y}
        width={width}
        height={height}
        margin={margin}
        ticker={data.map((x) => x.ticker)}
      />
    </svg>
  );
};

export default Chart;
