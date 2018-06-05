// @flow

import gql from 'graphql-tag'

export default gql`
  mutation saveModel($variables: String!, $covariables: String) {
    saveModel(variables: $variables, covariables: $covariables)
  }
`
