// @flow

import gql from 'graphql-tag'

export default gql`
  fragment VariableParts on Variable {
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

  mutation updateCurrentModel(
    $title: String
    $slug: String
    $variables: [Variable]
    $covariables: [Variable]
    $filters: [Variable]
    $testingDatasets: [Variable]
    $trainingDatasets: [Variable]
    $validationDatasets: [Variable]
    $selectedVariable: Variable
  ) {
    updateCurrentModel(
      title: $title
      slug: $slug
      variables: $variables
      covariables: $covariables
      filters: $filters
      testingDatasets: $testingDatasets
      trainingDatasets: $trainingDatasets
      validationDatasets: $validationDatasets
      selectedVariable: $selectedVariable
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
      selectedVariable
    }
  }
`
