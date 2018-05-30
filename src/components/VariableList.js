// @flow

import React from 'react'
import PropTypes from 'prop-types' // flowlint-line untyped-import:off
import { VariableListProps, GroupsProps } from '../proptypes'
import type { VariableListType, GroupsType } from '../flowtypes'

const propTypes = PropTypes.shape({
  variables: VariableListProps.isRequired,
  groups: GroupsProps.isRequired,
})

type V = {
  variables: VariableListType,
  groups: GroupsType,
}

const Variables = ({ variables, groups }: V) => {
  return (
    <div>
      {groups.groups.map(({ code, label }) => <p key={code}>{label}</p>)}
      {variables.map(({ code, label, description }) => (
        <p key={code} title={description}>
          {label}
        </p>
      ))}
    </div>
  )
}

Variables.propTypes = propTypes

export default Variables
