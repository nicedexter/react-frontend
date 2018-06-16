// @flow

import gql from 'graphql-tag'

export default gql`
  mutation updateCurrentModel (
    $index: String!
    $variables: [Variable]
    $covariables: [Variable]
    $filters: [Variable]
  ) {
    updateCurrentModel (
      index: $index
      variables: $variables
      covariables: $covariables
      filters: $filters
    ) @client {
      variables
      covariables
      filters
    }
  }
`
