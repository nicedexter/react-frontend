// @flow

import React from 'react'
import { Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import ExperimentContainer from './components/ExperimentContainer'

import './App.css'

export default () => (
  <div className="App">
    <Navbar />
    <Route path="/" exact component={ExperimentContainer} />
  </div>
)
