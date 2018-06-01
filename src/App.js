// @flow

import React from 'react'
import { Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Experiment from './components/Experiment'

import './App.css'

export default () => (
  <div className="App">
    <Navbar />
    <Route path="/" exact component={Experiment} />
  </div>
)
