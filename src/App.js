import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});

const App = () => (
  <ApolloProvider client={client}>
    <div id="app">success!</div>
  </ApolloProvider>
);

export default App;
