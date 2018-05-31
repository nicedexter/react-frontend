// @flow

import React from 'react'

import { HierarchyProps } from '../proptypes'
import type { VariableListType, GroupsType, HierarchyType } from '../flowtypes'

import './Hierarchy.css'

const propTypes = {
  hierarchy: HierarchyProps.isRequired,
}

const variableView = (variables: VariableListType) =>
  variables.map(variable => (
    <p className="variable" key={variable.code}>
      {variable.label}
    </p>
  ))

const groupView = (group: GroupsType) => (
  <div key={group.code} className="groupContainer">
    <p className="group">{group.label}</p>
    {group.variables.length > 0 ? variableView(group.variables) : null}
    {group.groups && group.groups.length > 0
      ? group.groups.map(groupView)
      : null}
  </div>
)

const Hierarchy = ({ hierarchy }: { hierarchy: HierarchyType }) =>
  console.log(hierarchy) || <div>{hierarchy.map(groupView)}</div>

Hierarchy.propTypes = propTypes

export default Hierarchy
