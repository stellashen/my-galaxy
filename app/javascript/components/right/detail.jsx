import React from "react";
import Radium from "radium";

class Detail extends React.Component {
  render() {
    return <div style={styles.base}>detail</div>;
  }
}

const styles = {
  base: {
    color: "red",
    padding: "20px"
  }
};

export default Radium(Detail);
