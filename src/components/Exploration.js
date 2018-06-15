// @flow

import React from 'react'

import TreeView from './TreeView'
import Histogram from './Histogram'
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
    this.props.handleClick([variable], type)
  }

  handleGroupClick = (group, type) => {
    this.props.handleClick(group.variables, type)
  }

  includesVariable = variable => {
    const {
      currentModel: { variables },
    } = this.props
    return variables.map(v => v.code).includes(variable)
  }

  includesCovariable = variable => {
    const {
      currentModel: { covariables },
    } = this.props
    return covariables.map(v => v.code).includes(variable)
  }

  includesVariablesInGroup = code => {
    const {
      currentModel: { variables },
    } = this.props

    return variables.map(v => v.group && v.group.code).includes(code)
  }

  includesCovariablesInGroup = code => {
    const {
      currentModel: { covariables },
    } = this.props
    return covariables.map(v => v.group && v.group.code).includes(code)
  }

  description = (variable: VariableType) => (
    <React.Fragment>
      <p className="item"> 5 subgroups, 56 variables</p>
      <p className="item">Add to model as</p>
      <Button
        onClick={() => this.handleClick(variable, 'variable')}
        className="item"
        bsSize="xsmall"
        active={this.includesVariable(variable)}
      >
        variables{' '}
      </Button>
      <Button
        onClick={() => this.handleClick(variable, 'covariable')}
        className="item"
        bsSize="xsmall"
        active={this.includesCovariable(variable)}
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
        active={this.includesVariablesInGroup(group.code)}
      >
        variables{' '}
      </Button>
      <Button
        onClick={() => this.handleGroupClick(group, 'covariable')}
        className="item"
        bsSize="xsmall"
        active={this.includesCovariablesInGroup(group.code)}
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
        <Histogram variables={variable} />
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
