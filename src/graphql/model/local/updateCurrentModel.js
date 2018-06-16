// @flow

import gql from 'graphql-tag'

export default gql`
  mutation updateCurrentModel (
    $variables: [Variable]
    $covariables: [Variable]
    $filters: [Variable]
  ) {
    updateCurrentModel (
      variables: $variables
      covariables: $covariables
      filters: $filters
    ) @client {
      title
      slug
      variables {
        ...VariableParts
      }
      covariables {
        ...VariableParts
      }
      groupings {
        ...VariableParts
      }
      filters {
        ...VariableParts
      }
      testingDatasets {
        ...VariableParts
      }
      trainingDatasets {
        ...VariableParts
      }
      validationDatasets {
        ...VariableParts
      }
    }
  }
`
