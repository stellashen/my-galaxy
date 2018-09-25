import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { jwt } from "./auth/jwt";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql"
});

const App = () => (
  <ApolloProvider client={client}>
    <div id="app">{jwt}</div>
  </ApolloProvider>
);

export default App;
