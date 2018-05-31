// @flow

import React from 'react'

import TreeView from './TreeView/TreeView'
import './TreeView/TreeView.css'

import { HierarchyProps } from '../proptypes'

const propTypes = {
  hierarchy: HierarchyProps.isRequired,
}

const variableView = (variables: Array<VariableType>) =>
  variables.map((variable: VariableType, i: number) => (
    <TreeView
      key={variable.code + '|' + i}
      nodeLabel={variable.label}
      defaultCollapsed={true}
    >
      <div className="info">{variable.description}</div>
      <div className="info">type: {variable.type}</div>
      <div className="info">methodology: {variable.methodology}</div>
    </TreeView>
  ))

const groupView = (group: GroupsType, i: number) => (
  <div key={group.code} className="groupContainer">
    <TreeView
      key={group.code + '|' + i}
      nodeLabel={group.label}
      defaultCollapsed={true}
    >
      {group.variables.length > 0 ? variableView(group.variables) : null}
      {group.groups && group.groups.length > 0
        ? group.groups.map(groupView)
        : null}
    </TreeView>
  </div>
)

const Hierarchy = ({ hierarchy }: { hierarchy: HierarchyArrayType }) => (
  <div>{hierarchy.map(groupView)}</div>
)

Hierarchy.propTypes = propTypes

export default Hierarchy
