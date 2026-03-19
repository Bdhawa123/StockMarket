import { Divider } from "@mui/material";
import { color } from "d3";
import React, { useState } from "react";

const SideNav = () => {
  const [bar, setBar] = useState(true);
  return bar ? (
    <div style={styles.container}>
      <div style={styles.SideNav}> API point 1</div>

      <Divider style={styles.divider} />
      <Divider />
      <div style={styles.SideNav}> API point 2</div>
    </div>
  ) : null;
};

const styles = {
  container: {
    display: "grid",
    placeItems: "center",
    paddingTop: "10%",
  },

  divider: {
    backgroundColor: "#06060702",
    width: "80%",
    margin: "10px 10px",
  },
};

export default SideNav;
