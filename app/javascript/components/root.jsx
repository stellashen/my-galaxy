import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HashRouter } from "react-router-dom";
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

const Root = token => (
  <ApolloProvider client={getClient(token.token)}>
    <HashRouter>
      <App token={token} />
    </HashRouter>
  </ApolloProvider>
);

export default Root;
