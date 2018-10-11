import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Radium, { Style } from "radium";
import Navbar from "./navbar";
import Stars from "./stars/stars";
import Explore from "./explore/explore";
import DetailContainer from "./right/detail_container";

class App extends React.Component {
  render() {
    const token = this.props.token;
    if (!token) return null;
    return (
      <div id="app" style={styles.base}>
        <div id="app-left">
          <Style
            scopeSelector="#app-left"
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
          <Navbar />
          <section style={[styles.leftSection, styles.scroll]}>
            <Switch>
              <Route path="/explore" component={Explore} />
              <Route path="/" component={Stars} />
              <Redirect from="*" to="/" />
            </Switch>
          </section>
        </div>
        <section style={[styles.rightSection, styles.scroll]}>
          <DetailContainer />
        </section>
      </div>
    );
  }
}

const styles = {
  base: {
    color: "#000",
    background: "#fff",
    fontFamily: "Gothic A1, sans-serif"
  },
  scroll: {
    height: "calc(100vh - 60px)",
    overflowY: "scroll"
  },
  leftSection: {
    width: "50vw",
    "@media (max-width: 900px)": {
      width: "450px"
    }
  },
  rightSection: {
    position: "fixed",
    top: "60px",
    right: "0",
    width: "50vw",
    borderLeft: "1px solid #d1d5da",
    "@media (max-width: 900px)": {
      width: "calc(100% - 450px)"
    }
  }
};

export default Radium(App);
