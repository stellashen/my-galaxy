import React from "react";
import Radium from "radium";

class Right extends React.Component {
  render() {
    return <div style={styles.base}>right section</div>;
  }
}

const styles = {
  base: {
    padding: "20px"
  }
};

export default Radium(Right);
