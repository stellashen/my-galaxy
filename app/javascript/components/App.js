import React from "react";
import { Route } from "react-router-dom";
import Radium from "radium";
import color from "color";
import Profile from "./profile";

class App extends React.Component {
  render() {
    const token = this.props.token.token;
    console.log(token);
    if (!token) return null;
    return (
      <div id="app" style={[styles.base]}>
        <Route path="/" component={Profile} />
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
