import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadChart from "./component/LoadCharts";
import SideNav from "./component/SideNav";
import { CssBaseline } from "@mui/material";
// import "./App.css";

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

function AppMain() {
  return (
    <div style={styles.container}>
      <div style={styles.column1}>
        <SideNav />
      </div>
      <div>
        <h1 style={styles.heading}>Stock Market</h1>
        <LoadChart />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "1.5fr 8.5fr",
    height: "100vh",
    gap: "20px",
  },

  heading: {
    display: "grid",
    placeItems: "center",
    margin: "2%",
    width: "75%",
  },
  column1: {
    backgroundColor: " #b3a4a462",
    position: "relative",
    height: "calc(75vh)",
    position: "sticky",
    top: "20px",
    marginTop: "5%",

    // gridColumnStart: "1",
    // gridRowStart: "1/span 8",
    // gridRowEnd: "last-line",
  },
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppMain />
    </ThemeProvider>
  );
};

export default App;
