// @flow

import React from 'react'
import PropTypes from 'prop-types' // flowlint-line untyped-import:off
import { graphql, compose } from 'react-apollo' // flowlint-line untyped-import:off

import { groupsAndVariables, currentModel, updateModel } from '../graphql'
import Exploration from './Exploration'

import { HierarchyProps } from '../proptypes'

const propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  hierarchy: HierarchyProps.isRequired,
}

type Props = {
  loading: boolean,
  error?: Object,
  updateModel: Function,
  hierarchy: GroupsType[],
}

class ExplorationContainer extends React.PureComponent<Props> {
  handleClick = (variables, type) => {
    const { updateModel } = this.props
    const nextModel = {}
    if (type === 'variable') {
      nextModel.variables = variables
    } else if (type === 'covariable') {
      nextModel.covariables = variables
    }
    updateModel({ variables: nextModel })
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
  groups.map(group => ({
    code: group.code,
    label: group.label,
    groups: group.groups ? makeHierarchy(group.groups, variables) : null,
    variables: variables.filter(variable => variable.group.code === group.code),
  }))

export default compose(
  graphql(currentModel, {
    props: ({ data: { loading, error, currentModel } }) => ({
      loading,
      error,
      currentModel,
    }),
  }),
  graphql(updateModel, { name: 'updateModel' }),
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
