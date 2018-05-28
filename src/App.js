// @flow

import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom' // flowlint-line untyped-import:off

import { Navbar } from 'react-bootstrap' // flowlint-line untyped-import:off
import Home from './components/Home'

import './App.css'

type Props = {}
type State = {}

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
