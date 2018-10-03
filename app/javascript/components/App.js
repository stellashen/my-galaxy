import React from "react";
import { Route } from "react-router-dom";
import Radium from "radium";
import Navbar from "./navbar";
import Stars from "./stars/stars";

class App extends React.Component {
  render() {
    const token = this.props.token;
    console.log(token);
    if (!token) return null;
    return (
      <div id="app" style={styles.base}>
        <Route path="/" component={Navbar} />
        <Route exact path="/" component={Stars} />
      </div>
    );
  }
}

var styles = {
  base: {
    color: "#000",
    background: "#fff",
    fontFamily: "Gothic A1, sans-serif"
  }
};

export default Radium(App);
