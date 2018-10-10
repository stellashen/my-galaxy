import React from "react";
import Radium from "radium";
import Detail from "./detail";
import Navigation from "./navigation";

class Right extends React.Component {
  render() {
    const repoOwner = "stellashen";
    const repoName = "my-galaxy";
    return (
      <div style={styles.base}>
        <Navigation />
        <Detail repoOwner="stellashen" repoName="my-galaxy" />
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
