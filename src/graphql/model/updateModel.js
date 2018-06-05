// @flow

import gql from 'graphql-tag'

export default gql`
  mutation updateModel(
    $index: String!
    $variable: Variable
    $covariable: Variable
    $filter: Variable
  ) {
    updateModel(
      index: $index
      variable: $variable
      covariable: $covariable
      filter: $filter
    ) @client {
      variables
      covariables
      filters
    }
  }
`
