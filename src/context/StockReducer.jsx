import React from "react";
import createDataContext from "./createDataContext";

const StockReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_US":
      return {
        ...state,
        US: [
          /* update state */
        ],
      };
    case "FETCH_AUS":
      return {
        ...state,
        AUS: [
          /* update state */
        ],
      };
    case "FETCH_IN":
      return {
        ...state,
        IN: [
          /* update state */
        ],
      };
    case "FETCH_HK":
      return {
        ...state,
        HK: [
          /* update state */
        ],
      };
    default:
      return state;
  }
};

const callUSTickerList = (dispatch) => {};

const callAUSTickerList = (dispatch) => {};

const callINTickerList = (dispatch) => {};
const callHXTickerList = (dispatch) => {};

export const { Provider, Context } = createDataContext(
  StockReducer,
  { callUSTickerList, callAUSTickerList, callINTickerList, callHXTickerList },
  { US: [], AUS: [], IN: [], HK: [] },
);
