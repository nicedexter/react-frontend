// @flow

import gql from 'graphql-tag'

export default gql`
  mutation saveModel($variables: [Variable]!) @client {
    saveModel(variables: $variables) {
      variables
    }
  }
`
