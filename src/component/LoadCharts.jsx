import React, { useState } from "react";
import Chart from "./Chart";

const LoadChart = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  const fetchTickerData = async (ticker) => {
    try {
      const url = `http://127.0.0.1:5000/api/stock?ticker=${ticker}`;
      const response = await fetch(url);
      // if (!response.ok) {
      //   throw new Error(`Response status:${response.status}`);
      // }
      const actualData = await response.json();
      console.log(actualData.data);

      setData(actualData);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button
        onClick={() => {
          fetchTickerData(input);
        }}
      >
        Submit
      </button>
      {Object.keys(data).length > 0 ? (
        <Chart ticker={input} data={data} />
      ) : null}
    </div>
  );
};

export default LoadChart;
