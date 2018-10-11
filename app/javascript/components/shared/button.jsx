import React from "react";
import Radium from "radium";
import color from "color";

class Button extends React.Component {
  render() {
    return (
      <button
        style={[styles.base, styles[this.props.kind]]}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

const styles = {
  base: {
    color: "#000",
    cursor: "pointer",
    fontWeight: "600",
    fontFamily: "Play, sans-serif",
    verticalAlign: "baseline",
    textAlign: "center",
    ":hover": {
      background: "#e6ebf1"
    }
  },

  primary: {
    background: color("#e6ebf1")
      .lighten(0.2)
      .hexString(),
    padding: "6px 12px",
    fontSize: "14px",
    lineHeight: "20px",
    border: "1px solid rgba(27,31,35,0.2)",
    borderRadius: "0.25em",
    minWidth: "64px"
  }
};

export default Radium(Button);
