// @flow

import gql from 'graphql-tag'

export default gql`
  mutation Experiments($name: String, $model: String, $algorithms: String) {
    runExperiments(
      name: $name
      model: $model
      algorithms: $algorithms
      datasets: "desd-synthdata"
    ) {
      uuid
      name
      hasError
      hasServerError
      shared
      resultsViewed
      algorithms {
        validation
        code
        name
        parameters {
          code
          value
        }
      }
    }
  }
`
