// @flow

import React from 'react'
import { render } from 'react-dom'

import { ApolloClient } from 'apollo-client' // flowlint-line untyped-import:off
import { ApolloProvider } from 'react-apollo' // flowlint-line untyped-import:off
import { InMemoryCache } from 'apollo-cache-inmemory' // flowlint-line untyped-import:off
import { withClientState } from 'apollo-link-state' // flowlint-line untyped-import:off
import { HttpLink } from 'apollo-link-http' // flowlint-line untyped-import:off
import { ApolloLink } from 'apollo-link' // flowlint-line untyped-import:off

import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App'
import { resolvers, defaults, schema } from './graphql'
import registerServiceWorker from './registerServiceWorker'

import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  defaults,
  resolvers,
  schema,
})

const client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    new HttpLink({
      uri: 'http://155.105.202.23:3000/graphql/',
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
  root
)
registerServiceWorker()
