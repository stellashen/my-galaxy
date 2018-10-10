import React from "react";
import Radium from "radium";
import DetailContainer from "./detail_container";

class Right extends React.Component {
  render() {
    return (
      <div style={styles.base}>
        <DetailContainer />
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
