// @flow

import { graphql } from 'react-apollo' // flowlint-line untyped-import:off
import {
  groupsAndVariables,
  updateCurrentModel,
  currentModel,
  saveModel,
  models,
  datasets
} from './graphql'

export const withVariables = graphql(groupsAndVariables, {
  props: ({ data: { loading, error, variables, groups } }) => {
    const hierarchy =
      variables.length && groups ? makeHierarchy(groups.groups, variables) : []

    return {
      loading,
      error,
      hierarchy,
      currentModel: { variables: [], covariables: [] },
    }
  },
})

export const withUpdateCurrentModel = graphql(updateCurrentModel, {
  name: 'updateCurrentModel',
})

export const withCurrentModel = graphql(currentModel, {
  props: ({ data: { loading, error, currentModel } }) => ({
    loading,
    error,
    currentModel,
  }),
})

export const withSaveModel = graphql(saveModel, { name: 'saveModel' })

export const withModels = graphql(models, {
  props: ({ data: { loading, error, models } }) => ({
    loading,
    error,
    models,
  }),
})

export const withDatasets = graphql(datasets, {
  props: ({ data: { loading, error, datasets } }) => ({
    loading,
    error,
    datasets,
  }),
})

const makeHierarchy = (groups: GroupsType[], variables: Array<VariableType>) =>
  groups.map(group => {
    const subvariables = variables.filter(
      variable => variable.group.code === group.code
    )
    return {
      code: group.code,
      label: group.label,
      groups: group.groups ? makeHierarchy(group.groups, variables) : null,
      variables: subvariables,
      subgroupCount: group.groups ? group.groups.length : 0,
      subvariablesCount: subvariables.length,
    }
  })