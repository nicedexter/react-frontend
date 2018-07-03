// @flow

import gql from 'graphql-tag'

export default gql`
  query Histogram(
    $variables: String!
    $covariables: String
  ) {
    mining(
      variables: $variables
      covariables: $covariables
      grouping: "dataset,gender,agegroup,alzheimerbroadcategory"
      datasets: "desd-synthdata"
      algorithm: "histograms"
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
