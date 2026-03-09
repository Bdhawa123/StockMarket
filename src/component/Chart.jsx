import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const Chart = ({ data }) => {
  const [msft, setMSFTdata] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://127.0.0.1:5000/api/stock?ticker=MSFT`;
        const response = await fetch(url);
        const actualData = await response.json();
        console.log(actualData.data);

        setMSFTdata(actualData);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>{data.ticker}</h2>
      {/* Pass the data object to the actual drawing component */}
      <LineChart data={data} msft={msft} />
    </div>
  );
};

const LineChart = ({ data, msft }) => {
  const gx = useRef();
  const gy = useRef();
  let formattedmsft = [];

  const [hoverData, setHoverData] = useState(null);

  const width = 928;
  const height = 600;
  const marginTop = 20;
  const marginRight = 45;
  const marginBottom = 30;
  const marginLeft = 40;

  // 1. Transform the Object into a D3-friendly Array
  // Transform the Object into a D3-friendly Array
  const formattedData = Object.entries(data.data).map(([year, price]) => ({
    date: new Date(year, 0, 1), // Sets date to Jan 1st of that year
    price: price,
  }));

  if (msft) {
    formattedmsft = Object.entries(msft.data).map(([year, price]) => ({
      date: new Date(year, 0, 1), // Sets date to Jan 1st of that year
      price: price,
    }));
  }

  // 2. Scales
  const x = d3.scaleUtc(
    d3.extent([...formattedData, ...formattedmsft], (d) => d.date),
    [marginLeft, width - marginRight],
  );

  const y = d3.scaleLinear(
    [0, d3.max([...formattedData, ...formattedmsft], (d) => d.price)],
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

  const onMouseMove = (event) => {
    const [mouseX] = d3.pointer(event);
    const x0 = x.invert(mouseX); // The date under the mouse

    const bisect = d3.bisector((d) => d.date).center;

    const index1 = bisect(formattedData, x0);
    const point1 = formattedData[index1];

    const index2 = bisect(formattedmsft, x0);
    const point2 = formattedmsft[index2];

    // Update state with both (or null if they don't exist at that date)
    setHoverData({
      point1: point1 || null,
      point2: point2 || null,
      xPos: mouseX, // Use the actual mouse X for the vertical line
    });
  };
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
      <path
        fill="none"
        stroke="steelblue"
        strokeWidth="1.5"
        d={line(formattedData)}
      />

      <path
        fill="none"
        stroke="red"
        strokeWidth="1.5"
        d={line(formattedmsft)}
      />

      {hoverData && (
        <g pointerEvents="none">
          <line
            x1={hoverData.xPos}
            x2={hoverData.xPos}
            y1={marginTop}
            y2={height - marginBottom}
            stroke="#ccc"
            strokeDasharray="4"
          />

          {/* Only show circle if point1 exists */}
          {hoverData.point1 && (
            <circle
              cx={hoverData.xPos}
              cy={y(hoverData.point1.price)}
              r={5}
              fill="steelblue"
            />
          )}

          {/* Only show circle if point2 exists */}
          {hoverData.point2 && (
            <circle
              cx={hoverData.xPos}
              cy={y(hoverData.point2.price)}
              r={5}
              fill="red"
            />
          )}

          <g transform={`translate(${hoverData.xPos + 15}, ${marginTop})`}>
            <rect width="130" height="65" fill="white" stroke="#ccc" rx="4" />

            <text x="10" y="20" fontSize="12" fontWeight="bold">
              {(hoverData.point1 || hoverData.point2).date.getFullYear()}
            </text>

            {/* Safe access for Main Ticker */}
            <text x="10" y="40" fontSize="11" fill="steelblue">
              {data.ticker}:{" "}
              {hoverData.point1
                ? `$${hoverData.point1.price.toFixed(2)}`
                : "N/A"}
            </text>

            {/* Safe access for MSFT */}
            <text x="10" y="55" fontSize="11" fill="red">
              MSFT:{" "}
              {hoverData.point2
                ? `$${hoverData.point2.price.toFixed(2)}`
                : "N/A"}
            </text>
          </g>
        </g>
      )}

      <rect
        width={width}
        height={height}
        fill="transparent"
        style={{ pointerEvents: "all" }}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setHoverData(null)}
      />
    </svg>
  );
};

export default Chart;
