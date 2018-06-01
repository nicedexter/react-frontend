// @flow

import gql from 'graphql-tag'

export default gql`
  mutation createModel($variables: String!) @client {
    createModel(variables: $variables) {
      variables
    }
  }
`
