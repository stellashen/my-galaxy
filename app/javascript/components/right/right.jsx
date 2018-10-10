import React from "react";
import Radium from "radium";
import Detail from "./detail";

class Right extends React.Component {
  render() {
    const repoOwner = "stellashen";
    const repoName = "my-galaxy";
    return (
      <div style={styles.base}>
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
