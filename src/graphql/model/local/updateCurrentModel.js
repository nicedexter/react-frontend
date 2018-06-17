// @flow

import gql from 'graphql-tag'

export default gql`
  mutation updateCurrentModel(
    $variables: [Variable]
    $covariables: [Variable]
    $filters: [Variable]
    $testingDatasets: [Variable]
    $trainingDatasets: [Variable]
    $validationDatasets: [Variable]
  ) {
    updateCurrentModel(
      variables: $variables
      covariables: $covariables
      filters: $filters
      testingDatasets: $testingDatasets
      trainingDatasets: $trainingDatasets
      validationDatasets: $validationDatasets
    ) @client {
      title
      slug
      variables {
        ...VariableParts
      }
      covariables {
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
