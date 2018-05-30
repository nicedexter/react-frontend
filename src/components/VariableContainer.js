// @flow

import React from 'react'
import PropTypes from 'prop-types' // flowlint-line untyped-import:off
import { graphql } from 'react-apollo' // flowlint-line untyped-import:off

import allGroupsAndVariables from '../graphql/allGroupsAndVariables'
import VariableList from './VariableList'

import { VariableListProps, GroupsProps } from '../proptypes'
import type { VariableListType, GroupsType } from '../flowtypes'

const propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  variables: VariableListProps,
  groups: GroupsProps,
}

type Props = {
  loading: boolean,
  error: string,
  variables: VariableListType,
  groups: GroupsType,
}

class VariableContainer extends React.Component<Props> {
  render() {
    const { loading, error, variables, groups } = this.props
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return <VariableList variables={variables} groups={groups} />
  }
}

VariableContainer.propTypes = propTypes

export default graphql(allGroupsAndVariables, {
  props: ({ data: { loading, error, variables, groups } }) => ({
    loading,
    error,
    variables: Array.isArray(variables) ? variables : [], // FIXME: graphql returns an empty object instead of an array
    groups: groups ? groups : null,
  }),
})(VariableContainer)
