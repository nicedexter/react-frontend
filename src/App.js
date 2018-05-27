// @flow

import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom' // flowlint-line untyped-import:off
import Variables from './components/Variables'
import { Navbar, Jumbotron } from 'react-bootstrap' // flowlint-line untyped-import:off
import './App.css'

type Props = {}
type State = {}

const Home = () => (
  <div>
    <h2> Home </h2>
    <Jumbotron>
      <h1>Hello MIP</h1>
    </Jumbotron>
    <Variables />
  </div>
)

const Detail = () => (
  <div>
    <h2> Detail </h2>
  </div>
)

class App extends Component<Props, State> {
  render() {
    return (
      <div className="App">
        <Navbar>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/details">Detail</Link>
            </li>
          </ul>
        </Navbar>

        <Route path="/" exact component={Home} />
        <Route path="/details" component={Detail} />
      </div>
    )
  }
}

export default App
