// @flow

import gql from 'graphql-tag'

export default gql`
  mutation saveModel(
    $title: String
    $slug: String
    $variables: [VariableInput]!
    $covariables: [VariableInput]
    $groupings: [VariableInput]
    $filters: [VariableInput]
    $testingDatasets: [VariableInput]
    $trainingDatasets: [VariableInput]
    $validationDatasets: [VariableInput]
  ) {
    saveModel(
      title: $title
      slug: $slug
      variables: $variables
      covariables: $covariables
      groupings: $groupings
      filters: $filters
      testingDatasets: $testingDatasets
      trainingDatasets: $trainingDatasets
      validationDatasets: $validationDatasets
    ) {
      slug
    }
  }
`
