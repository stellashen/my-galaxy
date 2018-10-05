import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Radium, { Style } from "radium";
import Navbar from "./navbar";
import Stars from "./stars/stars";
import Explore from "./explore/explore";

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
            "a:hover": {
              cursor: "pointer"
            },
            i: {
              marginRight: "5px"
            },
            h1: {
              padding: "6px 12px",
              color: "#1E6ED6"
            },
            "h1:hover": {
              textDecoration: "underline"
            },
            h2: {
              fontSize: "14px",
              lineHeight: "60px",
              padding: "0 20px"
            },
            "h2:hover": {
              background: "#404044"
            },
            h5: {
              display: "inline"
            },
            "h5:hover": {
              textDecoration: "underline"
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
        <Switch>
          <Route path="/explore" component={Explore} />
          <Route path="/" component={Stars} />
        </Switch>
        <Redirect from="*" to="/" />
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
