// @flow

import React from 'react'
import { render } from 'react-dom'

import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client' // flowlint-line untyped-import:off
import { ApolloProvider } from 'react-apollo' // flowlint-line untyped-import:off
import { InMemoryCache } from 'apollo-cache-inmemory' // flowlint-line untyped-import:off
import { withClientState } from 'apollo-link-state'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'

import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import { resolvers, defaultState } from './graphql'
import registerServiceWorker from './registerServiceWorker'

import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers,
})

const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    new HttpLink({
      uri: 'http://localhost:3000/graphql/',
    }),
  ]),
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
  document.getElementById('root')
)
registerServiceWorker()
