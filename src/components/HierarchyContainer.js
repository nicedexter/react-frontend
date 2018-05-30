// @flow

import React from 'react'
import PropTypes from 'prop-types' // flowlint-line untyped-import:off
import { graphql } from 'react-apollo' // flowlint-line untyped-import:off

import allGroupsAndVariables from '../graphql/allGroupsAndVariables'
import Hierarchy from './Hierarchy'

import { HierarchyProps } from '../proptypes'
import type { VariableListType, GroupsType, HierarchyType } from '../flowtypes'

const propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  hierarchy: HierarchyProps.isRequired,
}

type Props = {
  loading: boolean,
  error: string,
  hierarchy: HierarchyType,
}

class HierarchyContainer extends React.Component<Props> {
  render() {
    const { loading, error, hierarchy } = this.props

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return <Hierarchy hierarchy={hierarchy} />
  }
}

HierarchyContainer.propTypes = propTypes

const makeHierarchy = (groups, variables) =>
  groups.map(group => ({
    code: group.code,
    label: group.label,
    groups: group.groups ? makeHierarchy(group.groups, variables) : null,
    variables: variables.filter(variable => variable.group.code === group.code),
  }))

export default graphql(allGroupsAndVariables, {
  props: ({ data: { loading, error, variables, groups } }) => {
    const hierarchy =
      variables.length && groups ? makeHierarchy(groups.groups, variables) : []

    return {
      loading,
      error,
      hierarchy,
    }
  },
})(HierarchyContainer)
