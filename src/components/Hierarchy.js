// @flow

import React from 'react'

import TreeView from './TreeView/TreeView'
import { HierarchyProps } from '../proptypes'
import { Glyphicon, Button } from 'react-bootstrap'

const propTypes = {
  hierarchy: HierarchyProps.isRequired,
}
class Hierarchy extends React.PureComponent<*> {
  button = id => (
    <Button
      className="button"
      bsStyle="primary"
      bsSize="xsmall"
      onClick={() => this.props.handleClick(id)}
    >
      Add to model
    </Button>
  )

  groupView = (group: GroupsType, i: number) => (
    <div key={group.code} className="groupContainer">
      <TreeView
        key={group.code + '|' + i}
        nodeLabel={group.label}
        defaultCollapsed={true}
        button={this.button(group.code)}
      >
        {group.variables ? this.variableView(group.variables) : null}
        {group.groups ? group.groups.map(this.groupView) : null}
      </TreeView>
    </div>
  )

  variableView = (variables: Array<VariableType>) =>
    variables.map((variable: VariableType, i: number) => (
      <TreeView
        key={variable.code + '|' + i}
        nodeLabel={variable.label}
        defaultCollapsed={true}
        nodeIcon={<Glyphicon glyph="signal" />}
        button={this.button(variable.code)}
      >
        <div className="info">{variable.description}</div>
        <div className="info">type: {variable.type}</div>
        <div className="info">methodology: {variable.methodology}</div>
      </TreeView>
    ))

  render() {
    const { hierarchy }: { hierarchy: GroupsType[] } = this.props
    return hierarchy.map(this.groupView)
  }
}

Hierarchy.propTypes = propTypes

export default Hierarchy
