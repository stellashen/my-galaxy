import React from "react";
import Radium from "radium";
import color from "color";

class Button extends React.Component {
  render() {
    // Radium extends the style attribute to accept an array. It will merge
    // the styles in order. We use this feature here to apply the primary
    // or warning styles depending on the value of the `kind` prop. Since its
    // all just JavaScript, you can use whatever logic you want to decide which
    // styles are applied (props, state, context, etc).
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

// You can create your style objects dynamically or share them for
// every instance of the component.
const styles = {
  base: {
    color: "#000",
    cursor: "pointer",
    fontWeight: "600",
    fontFamily: "Play, sans-serif",
    verticalAlign: "baseline",
    // Adding interactive state couldn't be easier! Add a special key to your
    // style object (:hover, :focus, :active, or @media) with the additional rules.
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
    borderRadius: "0.25em"
  }
};

export default Radium(Button);
