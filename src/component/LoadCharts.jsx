import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Chart from "./Chart";
import { Button, TextField, Select, MenuItem } from "@mui/material";

const LoadUSCharts = ({ marketLink, title }) => {
  const [input, setInput] = useState("");
  const [timescale, setTimescale] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);
  }, [marketLink]);

  const removeSet = (ticker) => {
    console.log(ticker);
    const newData = data.filter((d) => d.ticker !== ticker);
    setData(newData);
  };

  const handleChange = (value) => {
    setTimescale(value);
    console.log(value);
    console.log(timescale);
  };

  // const fetchTickerData = async (ticker) => {
  //   try {
  //     const url = marketLink + ticker;

  //     const response = await fetch(url);

  //     if (response.status === 200) {
  //       const actualData = await response.json();
  //       let bool = data.some((x) => x.ticker === actualData.ticker);
  //       if (!bool) setData([...data, actualData]);
  //     }
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };

  const fetchTickerData = async (ticker) => {
    try {
      console.log(timescale);
      const url = `${marketLink}${ticker}&time=${timescale}`;
      console.log(url);
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
      <h1 style={styles.heading}>{title}</h1>
      <div style={styles.container}>
        <div style={styles.leftContainer}>
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
        </div>

        <div style={styles.selectStyle}>
          {/* The Select component operating entirely on its own */}
          <Select
            id="standalone-select"
            value={timescale}
            onChange={(event) => {
              handleChange(event.target.value);
            }}
            displayEmpty
          >
            {/* Placeholder text since there is no floating label */}
            <MenuItem value="" disabled>
              <em>Select Timescale</em>
            </MenuItem>
            <MenuItem value={5}>Five</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
      </div>
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
  heading: {
    display: "grid",
    placeItems: "center",
    margin: "2%",
    width: "75%",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
  },

  leftContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  selectStyle: {
    marginLeft: "auto",
    marginRight: "8rem",
  },
};

export default LoadUSCharts;
