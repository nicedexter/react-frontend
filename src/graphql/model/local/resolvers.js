// @flow

import gql from 'graphql-tag'
import query from './currentModel'

export default {
  Mutation: {
    updateCurrentModel: (
      _: any,
      { variables, covariables, filters },
      { cache }: { cache: any }
    ) => {
      const state = cache.readQuery({ query })
      const previousModel = state.currentModel
      const nextModel = Object.assign({}, previousModel)

      if (variables && variables.length > 0) {
        // Uses Set built in to intersect/union variables
        // Unfortunately, inheritage from Set doesn't work well yet, and comparing {} === {} => false
        // So I use codes to filter, and rebuild at the end

        const allVars = [...variables, ...previousModel.variables]
        const toCode = v => v.code
        const toObject = code => allVars.find(r => r.code === code)

        const newCodes = variables.map(toCode)
        const previousCodes = previousModel.variables.map(toCode)

        const addCodes = new Set([
          ...newCodes.filter(v => !new Set(previousCodes).has(v)),
        ]) 

        const removeCodes = new Set([
          ...previousCodes.filter(v => new Set(newCodes).has(v)),
        ])

        const nextVariables = new Set(
          [...previousCodes, ...addCodes].filter(v => !removeCodes.has(v))
        )

        nextModel.variables = [...nextVariables].map(toObject)
      }

      const data = { currentModel: nextModel }
      cache.writeQuery({ query, data })

    },

  },
}
