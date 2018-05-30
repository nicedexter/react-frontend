// @flow

import React from 'react'
// import PropTypes from 'prop-types' // flowlint-line untyped-import:off
import type { VariableListType, GroupsType, HierarchyType } from '../flowtypes'
import './Hierarchy.css'

const variableView = (variables: VariableListType) =>
  variables.map(variable => (
    <p className="variable" key={variable.code} style={{ marginLeft: '10px' }}>
      {variable.label}
    </p>
  ))

const groupView = (group: GroupsType) => (
  <div key={group.code} style={{ marginLeft: '10px' }}>
    <p className="group">{group.label}</p>
    {group.variables.length > 0 ? variableView(group.variables) : null}
    {group.groups && group.groups.length > 0
      ? group.groups.map(groupView)
      : null}
  </div>
)

const Hierarchy = ({ hierarchy }: { hierarchy: HierarchyType }) => (
  <div>{hierarchy.map(groupView)}</div>
)

// Hierarchy.propTypes = propTypes

export default Hierarchy
