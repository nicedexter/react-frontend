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

  mutation($title: String, $slug: String, $query: Query) {
    importModelAsCurrentModel(title: $title, slug: $slug, query: $query)
      @client {
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
