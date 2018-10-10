import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { StyleRoot } from "radium";

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

const Root = ({ token }) => (
  <ApolloProvider client={getClient(token)}>
    <HashRouter>
      <StyleRoot>
        <App token={token} />
      </StyleRoot>
    </HashRouter>
  </ApolloProvider>
);

export default Root;
