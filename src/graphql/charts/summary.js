// @flow

import gql from 'graphql-tag'

export default gql`
  query Summary($variables: String!, $covariables: String, $grouping: String) {
    summary(
      variables: $variables
      covariables: $covariables
      grouping: $grouping
    ) {
      jobId
      node
      function
      shape
      timestamp
      data
    }
  }
`
