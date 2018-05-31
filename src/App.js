// @flow

import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Experiment from './components/Experiment'

import './App.css'

const Detail = () => (
  <div>
    <h2> Detail </h2>
  </div>
)

class App extends PureComponent<*> {
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
