// @flow

import gql from 'graphql-tag'

export default gql`
  query allModels {
    allModels {
      variables
      covariables
      filters
    }
  }
`
