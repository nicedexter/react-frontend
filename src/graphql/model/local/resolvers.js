// @flow

import gql from 'graphql-tag'
import query from './currentModel'

export default {
  Mutation: {
    updateCurrentModel: (_: any, variables, { cache }: { cache: any }) => {
      const state = cache.readQuery({ query })
      const previousModel = state.currentModel
      const nextModel = Object.assign({}, previousModel)

      for (const name of [
        'variables',
        'covariables',
        'filters',
        'testingDatasets',
        'trainingDatasets',
        'validationDatasets',
      ]) {
        const elements = variables[name]
        if (elements && elements.length > 0) {
          // Uses Set built-in to intersect/union variables
          // Unfortunately, inheritage from Set doesn't work well yet, and comparing {} === {} => false
          // So I use codes to filter, and rebuild at the end

          const allVars = [...elements, ...previousModel[name]] // keep everything to rebuild objects
          const toCode = v => v.code
          const toObject = code => allVars.find(r => r.code === code)

          const newCodes = elements.map(toCode)
          const previousCodes = previousModel[name].map(toCode)

          const addCodes = new Set([
            ...newCodes.filter(v => !new Set(previousCodes).has(v)),
          ])

          const removeCodes = new Set([
            ...previousCodes.filter(v => new Set(newCodes).has(v)),
          ])

          const nextElements = new Set(
            [...previousCodes, ...addCodes].filter(v => !removeCodes.has(v))
          )

          nextModel[name] = [...nextElements].map(toObject)
        }
      }

      const data = { currentModel: nextModel }
      cache.writeQuery({ query, data })
    },
  },
}
