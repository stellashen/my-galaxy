import React from "react";
import Radium from "radium";
import Topic from "./topic";

class Topics extends React.Component {
  render() {
    return (
      <span style={styles.base}>
        {this.props.children.map((topic, idx) => (
          <div key={idx} style={styles.container}>
            <Topic>{topic}</Topic>
          </div>
        ))}
      </span>
    );
  }
}

const styles = {
  base: {
    fontFamily: "Play, sans-serif",
    display: "flex",
    flexFlow: "wrap"
  },
  container: {
    marginRight: "5px"
  }
};

export default Radium(Topics);
