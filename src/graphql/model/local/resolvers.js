// @flow

import gql from 'graphql-tag'
import currentModel from './currentModel'

export default {
  Mutation: {
    updateModel: (
      _: any,
      { index, variables, covariables, filters },
      { cache }: { cache: any }
    ) => {
      const previous = cache.readQuery({ query: currentModel })
      const currentModel = previous.currentModel

      // if (variable) {
      //   const previousVariables = previous.currentModel.variables
      //   if (!previousVariables.includes(variable)) {
      //     currentModel.variables = previousVariables.push(variable)
      //   } else {
      //     currentModel.variables = previousVariables.filter(v => v !== variable)
      //   }
      // }

      // if (covariable) {
      //   if (!previous.currentModel.covariables.includes(covariable)) {
      //     currentModel.covariables = previous.currentModel.covariables.concat(
      //       covariable
      //     )
      //   } else {
      //     currentModel.covariables = previous.currentModel.covariables.filter(
      //       v => v !== covariable
      //     )
      //   }
      // }

      // if (filter) {
      //   if (!previous.currentModel.filters.includes(filter)) {
      //     currentModel.filters = previous.currentModel.filters.concat(filter)
      //   } else {
      //     currentModel.filters = previous.currentModel.filters.filter(
      //       v => v !== filter
      //     )
      //   }
      // }

      // cache.writeQuery({ currentModel, data: currentModel })
    },
    // resetCurrentModel: (_, d, { cache }) => {
    //   cache.writeData({ data: defaultState })
    // },
  },
}
