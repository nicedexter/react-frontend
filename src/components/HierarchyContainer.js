// @flow

import React from 'react'
import PropTypes from 'prop-types' // flowlint-line untyped-import:off
import { graphql, compose } from 'react-apollo' // flowlint-line untyped-import:off

import { allGroupsAndVariables, updateModel } from '../graphql'
import Hierarchy from './Hierarchy'

import { HierarchyProps } from '../proptypes'

const propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  hierarchy: HierarchyProps.isRequired,
}

type Props = {
  loading: boolean,
  error?: Object,
  hierarchy: GroupsType[],
}

class HierarchyContainer extends React.PureComponent<Props> {
  handleClick = code => {
    const { updateModel } = this.props
    updateModel({
      variables: {
        index: 'mymodel',
        variables: code,
      },
    })
  }

  render() {
    const { loading, error, hierarchy } = this.props

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message}</p>

    return (
      <div>
        <Hierarchy hierarchy={hierarchy} handleClick={this.handleClick} />
      </div>
    )
  }
}

HierarchyContainer.propTypes = propTypes

const makeHierarchy = (groups: GroupsType[], variables: Array<VariableType>) =>
  groups.map(group => ({
    code: group.code,
    label: group.label,
    groups: group.groups ? makeHierarchy(group.groups, variables) : null,
    variables: variables.filter(variable => variable.group.code === group.code),
  }))

export default compose(
  graphql(updateModel, { name: 'updateModel' }),
  graphql(allGroupsAndVariables, {
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
)(HierarchyContainer)
