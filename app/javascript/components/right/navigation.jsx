import React from "react";
import Radium from "radium";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div style={styles.base}>Clone with SSH: {this.props.sshUrl}</div>;
  }
}

const styles = {
  base: {
    borderBottom: "1px solid #d1d5da",
    padding: "20px"
  }
};

export default Radium(Navigation);
