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

  query {
    currentModel @client {
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
      filters
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
