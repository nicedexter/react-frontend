// @flow

import { currentModel } from './'
import variablesQuery from './queries/variables'

export default {
  Mutation: {
    updateCurrentModel: (_: any, variables, { cache }: { cache: any }) => {
      const { variables: variableList } = cache.readQuery({
        query: variablesQuery,
      })
      const state = cache.readQuery({ query: currentModel })
      const previousModel = state.currentModel
      const nextModel = Object.assign({}, previousModel)

      const { title, slug, ...others } = variables
      if (title) nextModel.title = title
      if (slug) nextModel.slug = slug

      Object.keys(others).map(name => {
        const elements = variables[name]

        if (!elements) return

        // Uses class Set built-in to intersect/union variables
        // But you can't compare objects, and unfortunately, 'inheriting' from Set doesn't work well yet
        // So I use strings to filter, and rebuild the objects at the end
        const toCode = v => v.code
        const toObject = code => variableList.find(r => r.code === code)

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
      })

      const data = { currentModel: nextModel }
      cache.writeQuery({ query: currentModel, data })
    },
    importModelAsCurrentModel: (_, variables, { cache }) => {
      const { title, slug, query } = variables
      const nextModel = Object.assign(
        {},
        { ...query },
        { covariables: query.coVariables },
        { coVariables: [] },
        { filters: [] },
        { title, slug }
      )

      const data = { currentModel: nextModel }
      cache.writeQuery({ query: currentModel, data })
    },
  },
}
