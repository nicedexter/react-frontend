// @flow

import gql from 'graphql-tag'

export default {
  Mutation: {
    updateModel: (_, { index, variables, covariables }, { cache }) => {
      const query = gql`
        query GetCurrentModel {
          currentModel @client {
            variables
            covariables
            filters
          }
        }
      `
      const previous = cache.readQuery({ query })
      const data = {
        currentModel: {
          ...previous.currentModel,
          variables: previous.currentModel.variables.concat(variables),
          covariables: previous.currentModel.covariables.concat(covariables),
        },
      }

      cache.writeQuery({ query, data })
    },
    // resetCurrentModel: (_, d, { cache }) => {
    //   cache.writeData({ data: defaultState })
    // },
  },
}
