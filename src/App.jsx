import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SideNav from "./component/SideNav";
import { CssBaseline } from "@mui/material";
import LoadCharts from "./component/LoadCharts";
import { Provider as StockTickerProvider } from "./context/StockReducer";

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
        <Routes>
          <Route
            path="/"
            element={
              <LoadCharts
                marketLink="http://127.0.0.1:5000/api/stock/US?ticker="
                title="US Markets"
              />
            }
          />
          <Route
            path="/AUS"
            element={
              <LoadCharts
                marketLink="http://127.0.0.1:5000/api/stock/AUS?ticker="
                title="AUS Markets"
              />
            }
          />
          <Route
            path="/IN"
            element={
              <LoadCharts
                marketLink="http://127.0.0.1:5000/api/stock/IN?ticker="
                title="IN Markets"
              />
            }
          />
          <Route
            path="/HK"
            element={
              <LoadCharts
                marketLink="http://127.0.0.1:5000/api/stock/HK?ticker="
                title="HK Markets"
              />
            }
          />
        </Routes>
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

  column1: {
    backgroundColor: " #b3a4a462",
    height: "calc(75vh)",
    position: "sticky",
    top: "20px",
    marginTop: "5%",
  },
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StockTickerProvider>
        <AppMain />
      </StockTickerProvider>
    </ThemeProvider>
  );
};

export default App;
