// @flow

import React from 'react'
import { Label, Button, SplitButton, MenuItem } from 'react-bootstrap'

import { Datasets } from '.'

import './Model.css'
import { ModelProps } from '../proptypes'
import { datasets } from '../graphql'

const label = (v, select, type) => (
  <div className="variables-label" key={v.code}>
    <a href="javascript: void(0)" onClick={e => select(e, v, type)}>
      x
    </a>
    <Label>{v.label}</Label>
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
    <SplitButton
      bsStyle="default"
      bsSize="xsmall"
      title={title}
      id={'split-button'}
    >
      {models &&
        models.map((m, i) => (
          <MenuItem eventKey={i} key={m.slug} onSelect={handleSelect}>
            {m.title}
          </MenuItem>
        ))}
    </SplitButton>

    <h4>Datasets ({(datasets && datasets.length) || 0})</h4>
    <div className="datasets">
      {datasets && datasets.map(v => <Label key={v.code}>{v.label}</Label>)}
    </div>

    <h4>Variables ({(variables && variables.length) || 0}/1)</h4>
    <div className="variables">
      {variables && variables.map(v => label(v, handleDelete, 'variables'))}
    </div>

    <h4>Covariables ({(covariables && covariables.length) || 0})</h4>
    <div className="covariables">
      {covariables &&
        covariables.map(v => label(v, handleDelete, 'covariables'))}
    </div>

    <h4>Filters</h4>
    <div className="filters">
      {filters && filters.map(v => label(v, handleDelete, 'filters'))}
    </div>
    
    <Button bsSize="small" onClick={handleSave} style={{ width: '100%' }}>
      Save
    </Button>
  </div>
)

Model.propType = ModelProps

export default Model
