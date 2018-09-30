import React from "react";
import { Switch, Route } from "react-router-dom";
import Radium from "radium";
import color from "color";

class App extends React.Component {
  render() {
    return (
      <div id="app" style={[styles.base]}>
        Hello World
      </div>
    );
  }
}

var styles = {
  base: {
    color: "red",
    background: color("#0074d9")
      .lighten(0.2)
      .hexString()
  }
};

export default Radium(App);
