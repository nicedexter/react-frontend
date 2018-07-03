// @flow

import gql from 'graphql-tag'

export default gql`
  query Summary($variables: String!, $covariables: String, $grouping: String) {
    mining(
      variables: $variables
      covariables: $covariables
      grouping: $grouping
      datasets: "desd-synthdata"
      algorithm: "statisticsSummary"
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
