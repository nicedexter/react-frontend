// @flow

import React from 'react'
import PropTypes from 'prop-types' // flowlint-line untyped-import:off
import { graphql, compose } from 'react-apollo' // flowlint-line untyped-import:off

import { groupsAndVariables, currentModel, updateCurrentModel } from '../graphql'
import { Exploration } from '../components'

import { HierarchyProps } from '../proptypes'

const propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  hierarchy: HierarchyProps.isRequired,
}

type Props = {
  loading: boolean,
  error?: Object,
  updateCurrentModel: Function,
  hierarchy: GroupsType[],
}

class ExplorationContainer extends React.PureComponent<Props> {
  handleClick = (variables, type) => {
    const { updateCurrentModel } = this.props
    const nextModel = {}
    if (type === 'variable') {
      nextModel.variables = variables
    } else if (type === 'covariable') {
      nextModel.covariables = variables
    }
    updateCurrentModel({ variables: nextModel })
  }

  render() {
    const { loading, error, hierarchy, currentModel } = this.props

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message}</p>

    return (
      <div>
        <Exploration
          hierarchy={hierarchy}
          currentModel={currentModel}
          handleClick={this.handleClick}
        />
      </div>
    )
  }
}

ExplorationContainer.propTypes = propTypes

const makeHierarchy = (groups: GroupsType[], variables: Array<VariableType>) => 
  groups.map(group => {
    const subvariables = variables.filter(variable => variable.group.code === group.code)
    return ({
    code: group.code,
    label: group.label,
    groups: group.groups ? makeHierarchy(group.groups, variables) : null,
    variables: subvariables,
    subgroupCount:  group.groups ?  group.groups.length : 0,
    subvariablesCount: subvariables.length
  })})


export default compose(
  graphql(currentModel, {
    props: ({ data: { loading, error, currentModel } }) => ({
      loading,
      error,
      currentModel,
    }),
  }),
  graphql(updateCurrentModel, { name: 'updateCurrentModel' }),
  graphql(groupsAndVariables, {
    props: ({ data: { loading, error, variables, groups } }) => {
      const hierarchy =
        variables.length && groups
          ? makeHierarchy(groups.groups, variables)
          : []

      return {
        loading,
        error,
        hierarchy,
      }
    },
  })
)(ExplorationContainer)
