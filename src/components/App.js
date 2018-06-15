// @flow

import React from 'react'
import { Route } from 'react-router-dom'

import Navbar from './Navbar'
import Main from './Main'

import './App.css'

export default () => (
  <div className="App">
    <Navbar />
    <Route path="/" exact component={Main} />
  </div>
)
