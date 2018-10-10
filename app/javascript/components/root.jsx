import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HashRouter } from "react-router-dom";
import { StyleRoot } from "radium";
import { Provider } from "react-redux";
import App from "./App";

const getClient = token => {
  const GITHUB_BASE_URL = "https://api.github.com/graphql";
  const httpLink = new HttpLink({
    uri: GITHUB_BASE_URL,
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  const cache = new InMemoryCache();
  return new ApolloClient({
    link: httpLink,
    cache
  });
};

const Root = ({ store, token }) => (
  <ApolloProvider client={getClient(token)}>
    <StyleRoot>
      <Provider store={store}>
        <HashRouter>
          <App token={token} />
        </HashRouter>
      </Provider>
    </StyleRoot>
  </ApolloProvider>
);

export default Root;
