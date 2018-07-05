// @flow

import React from 'react'
import { Label, Button } from 'react-bootstrap'

import { Datasets } from '.'

import './Model.css'
import { ModelProps } from '../proptypes'
import { datasets } from '../graphql'

const label = (variable, select, remove, type) => (
  <div className="variables-label" key={variable.code}>
    <a onClick={e => remove(e, variable, type)}>
      x
    </a>
    <a onClick={e => select(e, variable)}>
      <Label>{variable.label}</Label>
    </a>
  </div>
)

const Model = ({
  handleSave,
  handleSelect,
  handleDelete,
  currentModel: { datasets, variables, covariables, filters, title },
  models,
}: {
  currentModel: ModelType,
}) => (
  <div>
    
    <h4>Datasets ({(datasets && datasets.length) || 0})</h4>
    <div className="datasets">
      {datasets && datasets.map(v => <Label key={v.code}>{v.label}</Label>)}
    </div>

    <h4>Variables ({(variables && variables.length) || 0}/1)</h4>
    <div className="variables">
      {variables && variables.map(v => label(v, handleSelect, handleDelete, 'variables'))}
    </div>

    <h4>Covariables ({(covariables && covariables.length) || 0})</h4>
    <div className="covariables">
      {covariables &&
        covariables.map(v => label(v, handleSelect, handleDelete, 'covariables'))}
    </div>

    <h4>Filters</h4>
    <div className="filters">
      {filters && filters.map(v => label(v, handleSelect, handleDelete, 'filters'))}
    </div>
    
    <Button bsSize="small" onClick={handleSave} style={{ width: '100%' }}>
      Save
    </Button>
  </div>
)

Model.propType = ModelProps

export default Model
