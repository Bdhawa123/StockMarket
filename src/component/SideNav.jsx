import { Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import React, { useState } from "react";

const SideNav = () => {
  const [bar, setBar] = useState(true);
  return bar ? (
    <div style={styles.container}>
      <Link component={RouterLink} to="/" underline="none" sx={styles.SideNav}>
        US Charts
      </Link>
      <Divider style={styles.divider} />
      <Link
        component={RouterLink}
        underline="none"
        sx={styles.SideNav}
        to="/AUS"
      >
        AUS Charts
      </Link>
      <Divider style={styles.divider} />
      <Link
        component={RouterLink}
        underline="none"
        sx={styles.SideNav}
        to="/IN"
      >
        INDIA Charts
      </Link>
      <Divider style={styles.divider} />
      <Link
        component={RouterLink}
        underline="none"
        sx={styles.SideNav}
        to="/HK"
      >
        Hong Kong Charts
      </Link>
      <Divider style={styles.divider} />
    </div>
  ) : null;
};

const styles = {
  container: {
    display: "grid",
    placeItems: "center",
    paddingTop: "10%",
    gridTemplateColumns: "1fr",
    justifyItems: "strech",
  },

  SideNav: {
    display: "flex",
    width: "90%",
    justifyContent: "center",
    gap: 1,
    padding: "12px 20px",
    color: "#333333",
    textDecoration: "none",
    transition: "background-color 0.2s ease",
    "&:hover": {
      bgcolor: "#f5f5f5", // Slightly lighter than your #e2dcdc
      "& .MuiSvgIcon-root": {
        color: "#D87D56", // Change icon color on hover too!
      },
    },
  },

  divider: {
    backgroundColor: "#06060702",
    width: "80%",
    margin: "10px 10px",
  },
};

export default SideNav;
