// @flow

import React, { Component } from "react";
import Variables from './components/Variables';
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
          <h1>Hello MIP</h1>
        </Jumbotron>
        <Variables />
      </div>
    );
  }
}

export default App;
