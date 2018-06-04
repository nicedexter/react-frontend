// @flow

import React from 'react'

import TreeView from './TreeView/TreeView'
import { HierarchyProps } from '../proptypes'
import { Glyphicon, Button } from 'react-bootstrap'

import './Hierarchy.css'

type Props = {
  hierarchy: GroupsType[],
  handleClick: Function,
}

class Hierarchy extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (args: { code: string, isVariable: boolean }) => {
    this.props.handleClick(args)
  }
  groupView = (group: GroupsType, i: number) => (
    <div key={group.code} className="groupContainer">
      <TreeView
        key={group.code + '|' + i}
        nodeLabel={this.label({ ...group, group, isVariable: false })}
        defaultCollapsed={true}
      >
        {group.variables ? this.variableView(group.variables) : null}
        {group.groups ? group.groups.map(this.groupView) : null}
      </TreeView>
    </div>
  )

  label = ({ code, label, description, goup, isVariable }: VariableType) => (
    <React.Fragment>
      <span className="title">
        <strong>{label}</strong>
      </span>
      <p className="item"> 5 subgroups, 56 variables</p>
      <p className="item">Add to model as</p>
      <Button
        onClick={() => this.handleClick({ code, isVariable, asVariable: true })}
        className="item"
        bsSize="xsmall"
        bsStyle="primary"
      >
        variables{' '}
      </Button>
      <Button
        onClick={() => this.handleClick({ code, isVariable })}
        className="item"
        bsSize="xsmall"
        bsStyle="primary"
      >
        covariables
      </Button>
    </React.Fragment>
  )

  variableView = (variables: VariableType[]) =>
    // $FlowFixMe
    variables.map((variable: VariableType, i: number) => (
      <TreeView
        key={variable.code + '|' + i}
        nodeLabel={this.label(variable)}
        defaultCollapsed={true}
        nodeIcon={<Glyphicon glyph="signal" />}
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

Hierarchy.propTypes = HierarchyProps.isRequired

export default Hierarchy
