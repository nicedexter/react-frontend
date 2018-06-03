// @flow

import React from 'react'

import TreeView from './TreeView/TreeView'
import { HierarchyProps } from '../proptypes'
import { Glyphicon, Button, Label, Popover } from 'react-bootstrap'

import './Hierarchy.css'
const propTypes = {
  hierarchy: HierarchyProps.isRequired,
}
class Hierarchy extends React.PureComponent<*> {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = args => {
    this.props.handleClick(args)
  }
  groupView = (group: GroupsType, i: number) => (
    <div key={group.code} className="groupContainer">
      <TreeView
        key={group.code + '|' + i}
        nodeLabel={this.label({ ...group, isGroup: true })}
        defaultCollapsed={true}
      >
        {group.variables ? this.variableView(group.variables) : null}
        {group.groups ? group.groups.map(this.groupView) : null}
      </TreeView>
    </div>
  )

  label = ({ code, label, description, isGroup }: VariableType) => (
    <React.Fragment>
      <span className="title">
        <strong>{label}</strong>
      </span>
      <Label className="item"> 5 subgroups, 56 variables</Label>
      <p className="item">Add to model as</p>
      <Button
        onClick={() => this.handleClick({ code, isGroup, asVariable: true })}
        className="item"
        bsSize="xsmall"
        bsStyle="primary"
      >
        variables{' '}
      </Button>
      <Button
        onClick={() => this.handleClick({ code, isGroup })}
        className="item"
        bsSize="xsmall"
        bsStyle="primary"
      >
        covariables
      </Button>
    </React.Fragment>
  )

  variableView = (variables: Array<VariableType>) =>
    variables.map((variable: VariableType, i: number) => (
      <TreeView
        key={variable.code + '|' + i}
        nodeLabel={this.label(variable)}
        defaultCollapsed={true}
        nodeIcon={<Glyphicon glyph="signal" />}
        //button={this.button(variable.code)}
      >
        <div className="info">{variable.description}</div>
        <div className="info">type: {variable.type}</div>
        <div className="info">methodology: {variable.methodology}</div>
      </TreeView>
    ))

  render() {
    const { hierarchy }: { hierarchy: GroupsType[] } = this.props
    return <div>{hierarchy.map(this.groupView)}</div>
  }
}

Hierarchy.propTypes = propTypes

export default Hierarchy
