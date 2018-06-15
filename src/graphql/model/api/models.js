// @flow

import gql from 'graphql-tag'

export default gql`
  {
    models {
      query {
        variables {
          code
        }
        coVariables {
          code
        }
        groupings {
          code
        }
        filters
        testingDatasets {
          code
        }
        trainingDatasets {
          code
        }
        validationDatasets {
          code
        }
      }
      title
      slug
      description
      valid
    }
  }
`
