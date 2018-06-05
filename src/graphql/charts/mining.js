// @flow

import gql from 'graphql-tag'

export default gql`
  query Mining($variable: String!) {
    mining(variable: $variable) {
      jobId
      node
      function
      shape
      timestamp
      data
    }
  }
`
