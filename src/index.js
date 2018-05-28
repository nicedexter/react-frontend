// @flow

import React from 'react'
import { render } from 'react-dom'

import ApolloClient from 'apollo-boost' // flowlint-line untyped-import:off
import { ApolloProvider } from 'react-apollo' // flowlint-line untyped-import:off
import { InMemoryCache } from 'apollo-cache-inmemory' // flowlint-line untyped-import:off

import { BrowserRouter as Router } from 'react-router-dom' // flowlint-line untyped-import:off

import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

const cache = new InMemoryCache()
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql/',
  cache,
})

const root = document.getElementById('root')
if (root == null) {
  throw new Error('no root element')
}

render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  root
)
registerServiceWorker()
