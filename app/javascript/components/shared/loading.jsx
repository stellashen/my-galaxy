import React from "react";
import Radium from "radium";
const Loading = () => (
  <div style={[styles.base, styles.center]}>
    <div style={styles.content}>
      <span>loading...</span>
      <span>
        <img
          src="https://res.cloudinary.com/devleg/image/upload/v1538510231/loading.gif"
          style={styles.image}
        />
      </span>
    </div>
  </div>
);
var styles = {
  base: {
    color: "#fff",
    background: "#000",
    fontFamily: "Play, sans-serif",
    height: "100vh"
  },
  center: {
    textAlign: "center",
    verticalAlign: "middle",
    alignItems: "center",
    display: "flex"
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    adjustContent: "space-around",
    fontSize: "28px"
  },
  image: {
    width: "200px",
    display: "inline"
  }
};
export default Radium(Loading);
