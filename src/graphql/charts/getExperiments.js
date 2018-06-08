// @flow

import gql from 'graphql-tag'

export default gql`
  {
    getExperiments {
      name
      result
      uuid
    }
  }
`
