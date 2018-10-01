import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { HashRouter } from "react-router-dom";
import App from "./App";

const getClient = token => {
  return new ApolloClient({
    uri: "https://api.github.com/graphql",
    request: operation => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`
        }
      });
    }
  });
};

const Root = token => (
  <ApolloProvider client={getClient(token.token)}>
    <HashRouter>
      <App token={token} />
    </HashRouter>
  </ApolloProvider>
);

export default Root;
