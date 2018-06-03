// @flow

import gql from 'graphql-tag'

export default gql`
  query {
    currentModel @client {
      variables
      covariables
      filters
    }
  }
`
