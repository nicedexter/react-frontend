// @flow

import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Experiment from './components/Experiment'

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
        <Navbar />

        <Route path="/" exact component={Experiment} />
        <Route path="/details" component={Detail} />
      </div>
    )
  }
}

export default App
