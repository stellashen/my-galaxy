import React from "react";
import Radium from "radium";

class Topic extends React.Component {
  render() {
    return <span style={styles.base}>{this.props.children}</span>;
  }
}

const styles = {
  base: {
    padding: "3px 8px",
    boxSizing: "borderBox",
    border: "1px solid rgba(27,31,35,0.2)",
    borderRadius: "3px"
  }
};

export default Radium(Topic);
