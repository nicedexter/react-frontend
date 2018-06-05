// @flow

import gql from 'graphql-tag'

export default {
  Mutation: {
    updateModel: (
      _: any,
      { index, variable, covariable, filter },
      { cache }: { cache: any }
    ) => {
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
      const currentModel = {
        ...previous.currentModel,
      }

      if (variable) {
        if (
          !previous.currentModel.variables.includes(variable) &&
          previous.currentModel.variables.length < 1
        ) {
          currentModel.variables = previous.currentModel.variables.concat(
            variable
          )
        } else {
          currentModel.variables = previous.currentModel.variables.filter(
            v => v !== variable
          )
        }
      }

      if (covariable) {
        if (!previous.currentModel.covariables.includes(covariable)) {
          currentModel.covariables = previous.currentModel.covariables.concat(
            covariable
          )
        } else {
          currentModel.covariables = previous.currentModel.covariables.filter(
            v => v !== covariable
          )
        }
      }

      if (filter) {
        if (!previous.currentModel.filters.includes(filter)) {
          currentModel.filters = previous.currentModel.filters.concat(filter)
        } else {
          currentModel.filters = previous.currentModel.filters.filter(
            v => v !== filter
          )
        }
      }

      const data = { currentModel }

      cache.writeQuery({ query, data })
    },
    // resetCurrentModel: (_, d, { cache }) => {
    //   cache.writeData({ data: defaultState })
    // },
  },
}
