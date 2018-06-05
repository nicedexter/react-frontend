// @flow

import React from 'react'

import TreeView from './TreeView'
import MiningChart from './MiningChart'
import { HierarchyProps } from '../proptypes'
import { Glyphicon, Button } from 'react-bootstrap'

import './Exploration.css'

type Props = {
  hierarchy: GroupsType[],
  handleClick: Function,
}

class Hierarchy extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (variable, type) => {
    this.props.handleClick(variable, type)
  }

  handleGroupClick = (group, type) => {
    group.variables.forEach(variable => {
      this.props.handleClick(variable, type)
    })
  }

  description = (variable: VariableType) => (
    <React.Fragment>
      <p className="item"> 5 subgroups, 56 variables</p>
      <p className="item">Add to model as</p>
      <Button
        onClick={() => this.handleClick(variable, 'variable')}
        className="item"
        bsSize="xsmall"
        active={this.props.currentModel.variables.includes(variable)}
      >
        variables{' '}
      </Button>
      <Button
        onClick={() => this.handleClick(variable, 'covariable')}
        className="item"
        bsSize="xsmall"
        active={this.props.currentModel.covariables.includes(variable)}
      >
        covariables
      </Button>
    </React.Fragment>
  )

  groupDescription = (group: GroupsType) => (
    <React.Fragment>
      <p className="item"> 5 subgroups, 56 variables</p>
      <p className="item">Add to model as</p>
      <Button
        onClick={() => this.handleGroupClick(group, 'variable')}
        className="item"
        bsSize="xsmall"
        active={this.props.currentModel.variables
          .map(co => co.group.code)
          .includes(group.code)}
      >
        variables{' '}
      </Button>
      <Button
        onClick={() => this.handleGroupClick(group, 'covariable')}
        className="item"
        bsSize="xsmall"
        active={this.props.currentModel.covariables
          .map(co => co.group.code)
          .includes(group.code)}
      >
        covariables
      </Button>
    </React.Fragment>
  )

  groupView = (group: GroupsType, i: number) => (
    <div key={group.code} className="groupContainer">
      <TreeView
        key={group.code + '|' + i}
        nodeDescription={this.groupDescription(group)}
        nodeTitle={group.label}
        defaultCollapsed={true}
      >
        {group.variables ? this.variableView(group.variables) : null}
        {group.groups ? group.groups.map(this.groupView) : null}
      </TreeView>
    </div>
  )

  variableView = (variables: VariableType[]) =>
    // $FlowFixMe
    variables.map((variable: VariableType, i: number) => (
      <TreeView
        key={variable.code + '|' + i}
        nodeTitle={variable.label}
        nodeDescription={this.description(variable)}
        defaultCollapsed={true}
        nodeIcon={<Glyphicon glyph="signal" />}
      >
        <div className="info">{variable.description}</div>
        <div className="info">type: {variable.type}</div>
        <div className="info">methodology: {variable.methodology}</div>
        <MiningChart variable={variable} />
      </TreeView>
    ))

  render() {
    const { hierarchy }: { hierarchy: GroupsType[] } = this.props
    return (
      <div>
        TreeView
        {hierarchy.map(this.groupView)}
      </div>
    )
  }
}

Hierarchy.propTypes = HierarchyProps.isRequired

export default Hierarchy
