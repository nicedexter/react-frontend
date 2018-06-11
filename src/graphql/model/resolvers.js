// @flow

import gql from 'graphql-tag'
import getCurrentModel from './getCurrentModel'

export default {
  Mutation: {
    updateModel: (
      _: any,
      { index, variable, covariable, filter },
      { cache }: { cache: any }
    ) => {
      const previous = cache.readQuery({ getCurrentModel })
      const currentModel = {
        ...previous.currentModel,
      }

      if (variable) {
        const previousVariables = previous.currentModel.query.variables.map(
          v => v.code
        )
        if (
          !previousVariables.includes(variable) &&
          previousVariables.length < 1
        ) {
          currentModel.query.variables = previousVariables.concat({
            code: variable,
          })
        } else {
          currentModel.query.variables = previousVariables.filter(
            v => v !== variable
          )
        }
      }

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

      const data = { currentModel }

      cache.writeQuery({ getCurrentModel, data })
    },
    // resetCurrentModel: (_, d, { cache }) => {
    //   cache.writeData({ data: defaultState })
    // },
  },
}
