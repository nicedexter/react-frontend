// @flow

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { compose } from 'ramda'

import { App } from './components'
import withAppolo from './graphql/withApollo'
import registerServiceWorker from './registerServiceWorker'

import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

const root = document.getElementById('root')
if (root == null) {
  throw new Error('no root element')
}

const MyApp = props => (
  <Router {...props}>
    <App />
  </Router>
)

render(withAppolo(MyApp), root)

registerServiceWorker()
