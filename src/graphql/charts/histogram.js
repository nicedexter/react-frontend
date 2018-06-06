// @flow

import gql from 'graphql-tag'

export default gql`
  query Histogram($variable: String!) {
    histogram(variable: $variable) {
      jobId
      node
      function
      shape
      timestamp
      data
    }
  }
`
