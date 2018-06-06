// @flow

import gql from 'graphql-tag'

export default gql`
{
  methods {
    algorithms {
      code
      label
      type
    }
  }
}
`
