// @flow

import gql from 'graphql-tag'

export default gql`
  {
    groups {
      code
      label
      groups {
        code
        label
        groups {
          code
          label
          groups {
            code
            label
            groups {
              code
              label
            }
          }
        }
      }
    }
  }
`
