// @flow

import gql from 'graphql-tag'

export default gql`
  mutation updateModel(
    $index: String!
    $variables: [Variable]
    $covariables: [Variable]
    $filters: [Variable]
  ) {
    updateModel(
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
