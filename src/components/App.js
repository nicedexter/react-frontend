// @flow

import React from 'react'
import { Route } from 'react-router-dom'

import { Navbar, Layout } from './'

import './App.css'

export default () => (
  <div className="App">
    <Navbar />
    <Route path="/" exact component={Layout} />
  </div>
)
