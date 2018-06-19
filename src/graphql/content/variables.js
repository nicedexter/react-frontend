// @flow

import gql from 'graphql-tag'

export default gql`
  {
    variables {
      code
      label
      type
      sql_type
      description
      methodology
      group {
        code
        label
      }
      isVariable
    }
  }
`
