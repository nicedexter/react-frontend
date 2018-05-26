import React from "react";
import { render } from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import "./index.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql/"
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

render(<ApolloApp />, document.getElementById("root"));
registerServiceWorker();
