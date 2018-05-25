// @flow

import React, { Component } from "react";
import { Navbar, Jumbotron } from "react-bootstrap";
import "./App.css";

type Props = {};

type State = {
  count: number
};

class App extends Component<Props, State> {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Jumbotron>
          <h1>Hey</h1>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
