// @flow

import gql from 'graphql-tag'

export default gql`
  {
    methods {
      algorithms {
        code
        label
        type
        description
        constraints {
          variable {
            min_count
            binominal
            integer
            polynominal
            real
          }
          covariables {
            min_count
            binominal
            integer
            polynominal
            real
          }
          grouping {
            min_count
            binominal
            integer
            polynominal
            real
          }
          mixed
        }
        parameters {
          code
          label
          description
          default_value
          type
          constraints {
            min
            max
          }
        }
      }
      metrics {
        regression {
          code
          label
          type
        }
        classification {
          code
          label
          type
        }
        binominal_classification {
          code
          label
          type
        }
      }
      validations {
        code
        label
        parameters {
          code
          label
          default_value
          type
          constraints {
            min
            max
          }
        }
      }
    }
  }
`
