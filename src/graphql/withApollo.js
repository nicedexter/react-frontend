// @flow

import React from 'react'
// FIXME: replace with Apollo Boost
import { ApolloClient } from 'apollo-client' // flowlint-line untyped-import:off
import { ApolloProvider } from 'react-apollo' // flowlint-line untyped-import:off
import { InMemoryCache } from 'apollo-cache-inmemory' // flowlint-line untyped-import:off
import { withClientState } from 'apollo-link-state' // flowlint-line untyped-import:off
import { HttpLink } from 'apollo-link-http' // flowlint-line untyped-import:off
import { ApolloLink } from 'apollo-link' // flowlint-line untyped-import:off

import { resolvers, defaults, schema } from './'

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'CurrentModel':
      case 'Model':
        return object.slug
      case 'Dataset':
      case 'Group':
      case 'Variable':
        return object.code
      default:
        return object.uuid
    }
  },
})

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

const withApollo = BaseComponent => (
  <ApolloProvider client={client}>
    <BaseComponent />
  </ApolloProvider>
)

export default withApollo
