import React from "react";
import Radium from "radium";
import Detail from "./detail";
import Navigation from "./navigation";

class Right extends React.Component {
  render() {
    return (
      <div style={styles.base}>
        <Navigation />
        <Detail />
      </div>
    );
  }
}

const styles = {
  base: {
    display: "flex",
    flexDirection: "column"
  }
};

export default Radium(Right);
