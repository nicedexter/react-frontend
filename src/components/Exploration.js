// @flow

import React from 'react'

import TreeView from './TreeView'
import Histogram from './Histogram'
import { HierarchyProps } from '../proptypes'
import { Glyphicon, Button, FormGroup, Radio } from 'react-bootstrap'

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

  includesVariable = code => {
    const { currentModel } = this.props
    return (
      currentModel && currentModel.variables.map(v => v.code).includes(code)
    )
  }

  includesCovariable = code => {
    const { currentModel } = this.props
    return currentModel && currentModel.covariables.map(v => v.code).includes(code)
  }

  includesVariablesInGroup = code => {
    const { currentModel } = this.props

    return currentModel && currentModel.variables.map(v => v.group && v.group.code).includes(code)
  }

  includesCovariablesInGroup = code => {
    const { currentModel } = this.props
    return currentModel && currentModel.covariables.map(v => v.group && v.group.code).includes(code)
  }

  description = (variable: VariableType) => (
    <React.Fragment>
      <Button
        onClick={() => this.handleClick(variable, 'variable')}
        className="item"
        bsSize="xsmall"
        active={this.includesVariable(variable.code)}
      >
        <Glyphicon glyph="stats" />
      </Button>
      <Button
        onClick={() => this.handleClick(variable, 'covariable')}
        className="item"
        bsSize="xsmall"
        active={this.includesCovariable(variable.code)}
      >
        <Glyphicon glyph="stats" />
      </Button>
    </React.Fragment>
  )

  groupDescription = (group: GroupsType) => (
    <React.Fragment>
      <FormGroup bsSize="lg">
        <Radio name="radioGroup" inline /> <Radio name="radioGroup" inline />{' '}
        <Radio name="radioGroup" inline />
      </FormGroup>
      {/* <p className="item">Add to model as</p>
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
      </Button> */}
    </React.Fragment>
  )

  groupView = (group: GroupsType, selectedVariable: String) => {
    const c = group.subgroupCount
    const v = group.subvariablesCount
    const pluralize = (word, count) =>
      count > 1 ? `${count} ${word}s` : `${count} ${word}`
    let description = c > 0 ? pluralize('group', c) : ''
    if (c > 0 && v > 0) description += ', '
    description += v > 0 ? pluralize('variable', v) : ''
    description = `(${description})`

    return (
      <div key={group.code} className="groupContainer">
        <TreeView
          key={group.code}
          nodeDescription={description}
          nodeTitle={group.label}
          defaultCollapsed={this.includesVariablesInGroup(selectedVariable)}
          nodeIcon={<Glyphicon glyph="briefcase" />}
        >
          {group.variables ? this.variableView(group.variables) : null}
          {group.groups ? group.groups.map(this.groupView) : null}
        </TreeView>
      </div>
    )
  }

  variableView = (variables: VariableType[]) =>
    // $FlowFixMe
    variables.map((variable: VariableType, i: number) => (
      <TreeView
        key={variable.code + '|' + i}
        nodeTitle={variable.label}
        nodeDescription={this.description(variable)}
        defaultCollapsed={true}
        nodeIcon={<Glyphicon glyph="file" />}
      >
        <div className="info">{variable.description}</div>
        <div className="info">type: {variable.type}</div>
        <div className="info">methodology: {variable.methodology}</div>
        <Histogram variables={variable} />
      </TreeView>
    ))

  render() {
    const {
      hierarchy,
    }: { hierarchy: GroupsType[] } = this.props
    return (
      <React.Fragment>
        <p>Add to model as variable, covariable, filter</p>
        <div className="exploration-tree-container">
          {hierarchy.map(this.groupView, [])}
        </div>
      </React.Fragment>
    )
  }
}

Hierarchy.propTypes = HierarchyProps.isRequired

export default Hierarchy
