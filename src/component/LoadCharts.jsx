import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import Chart from "./Chart";
import { Button, TextField } from "@mui/material";

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
        if (!bool) setData([...data, actualData]);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <TextField
        label={input === "" ? "TICKER" : ""}
        variant="standard"
        onChange={(e) => setInput(e.target.value)}
        sx={styles.inputStyle}
      />
      <Button
        variant="contained"
        size="small"
        onClick={() => {
          fetchTickerData(input);
        }}
        sx={styles.button}
      >
        Add
      </Button>
      <div>
        {data.map((d) => {
          return (
            <div style={styles.objectStyle}>
              {d.ticker}
              <IoIosClose
                size={25}
                style={styles.closeIcon}
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
  objectStyle: {
    background: "#c9c2c1",
    borderRadius: "3px",
    display: "inline-flex",
    padding: "2px 6px",
    margin: "1px",
  },

  closeIcon: {
    padding: "1px",
    cursor: "pointer",
  },

  inputStyle: {
    marginBottom: "1%",
  },

  button: {
    backgroundColor: "#c9c2c1",
    color: "black",
  },
};

export default LoadChart;
