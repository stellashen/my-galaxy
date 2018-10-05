import React from "react";
import { Route } from "react-router-dom";
import Radium, { Style } from "radium";
import Navbar from "./navbar";
import Stars from "./stars/stars";

class App extends React.Component {
  render() {
    const token = this.props.token;
    if (!token) return null;
    return (
      <div id="app" style={styles.base}>
        <Style
          scopeSelector="#app"
          rules={{
            span: {
              display: "block",
              margin: "10px"
            },
            strong: {
              fontWeight: "900",
              display: "inline"
            },
            i: {
              marginRight: "5px"
            },
            h1: {
              padding: "6px 12px",
              color: "#1E6ED6",
              ":hover": {
                textDecoration: "underline"
              }
            },
            small: {
              display: "block",
              color: "red",
              fontSize: "12px",
              padding: "5px 20px"
            }
          }}
        />
        <Route path="/" component={Navbar} />
        <Route exact path="/" component={Stars} />
      </div>
    );
  }
}

const styles = {
  base: {
    color: "#000",
    background: "#fff",
    fontFamily: "Gothic A1, sans-serif"
  }
};

export default Radium(App);
