import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Radium from "radium";
import color from "color";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql"
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="app" style={[styles.base]}>
          Hello World
        </div>
      </ApolloProvider>
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
