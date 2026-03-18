import React, { act, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Chart from "./Chart";

const LoadChart = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  const removeSet = (ticker) => {
    console.log(ticker);
    const newData = data.filter((d) => d.ticker !== ticker);
    setData(newData);
  };
  const fetchTickerData = async (ticker) => {
    try {
      const url = `http://127.0.0.1:5000/api/stock?ticker=${ticker}`;
      const response = await fetch(url);

      if (response.status === 200) {
        const actualData = await response.json();
        let bool = data.some((x) => x.ticker === actualData.ticker);
        // const bool = data.filter((x)=>x.ticker)
        if (!bool) setData([...data, actualData]);
      }
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
        Add
      </button>
      <div>
        {data.map((d) => {
          return (
            <div style={styles.backgroundStyling}>
              {d.ticker}
              <IoIosClose
                onClick={() => {
                  removeSet(d.ticker);
                }}
              />
            </div>
          );
        })}
      </div>
      {Object.keys(data).length > 0 ? (
        <Chart ticker={input} data={data} />
      ) : null}
    </div>
  );
};

const styles = {
  backgroundStyling: {
    background: "#c9c2c1",
    borderRadius: "3px",
    display: "inline-flex",
    padding: "2px 6px",
    margin: "1px",
  },
};

export default LoadChart;
