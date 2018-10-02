import React from "react";
import { Switch, Route } from "react-router-dom";
import Radium from "radium";
import color from "color";
import ApolloClient, { gql } from "apollo-boost";

const GET_USER = gql`
  {
    viewer {
      name
      url
      repositories(last: 1) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

class App extends React.Component {
  render() {
    const token = this.props.token.token;
    console.log(token);
    if (!token) return null;
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
