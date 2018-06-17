// @flow

import React from 'react'
import { Label, Button, SplitButton, MenuItem } from 'react-bootstrap'

import { Datasets } from '.'

import './Model.css'
import { ModelProps } from '../proptypes'
import { datasets } from '../graphql';

const Model = ({
  handleSave,
  handleSelect,
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

   

    <div className="datasets">
      <h4>Datasets ({(datasets && datasets.length) || 0})</h4>
      {datasets && datasets.map(v => <Label key={v.code}>{v.label}</Label>)}
    </div>

    <div className="variables">
      <h4>Variables ({(variables && variables.length) || 0}/1)</h4>
      {variables && variables.map(v => <Label key={v.code}>{v.label}</Label>)}
    </div>
    <div className="covariables">
      <h4>Covariables ({(covariables && covariables.length) || 0})</h4>
      {covariables &&
        covariables.map(v => <Label key={v.code}>{v.label}</Label>)}
    </div>
    <div className="filters">
      <h4>Filters</h4>
      {filters && filters.map(v => <Label key={v.code}>{v.label}</Label>)}
    </div>
    <Button bsSize="small" onClick={handleSave} style={{ width: '100%' }}>
      Save
    </Button>
  </div>
)

Model.propType = ModelProps

export default Model
