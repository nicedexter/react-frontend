// @flow

import React from 'react'
import PropTypes from 'prop-types' // flowlint-line untyped-import:off
import { graphql } from 'react-apollo' // flowlint-line untyped-import:off

import allGroupsAndVariables from '../graphql/allGroupsAndVariables'
import VariableList from './VariableList'

import { VariableListProps } from '../proptypes'
import type { VariableListType } from '../flowtypes'

const propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  variables: VariableListProps,
}

type Props = {
  loading: boolean,
  error: string,
  variables: VariableListType,
}

class VariableContainer extends React.Component<Props> {
  render() {
    const { loading, error, variables } = this.props
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return <VariableList variables={variables} />
  }
}

VariableContainer.propTypes = propTypes

export default graphql(allGroupsAndVariables, {
  props: ({ data: { loading, error, variables } }) => ({
    loading,
    error,
    variables: Array.isArray(variables) ? variables : [], // FIXME: graphql returns an empty object instead of an array
  }),
})(VariableContainer)
