// @flow

import React from 'react'
import { Label, Button, SplitButton, MenuItem } from 'react-bootstrap'

import './Model.css'
import { ModelProps } from '../proptypes'

const ModelView = ({
  handleSave,
  handleSelect,
  currentModel: { variables, covariables, filters, title },
  allModels,
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
      {allModels &&
        allModels.map((m, i) => (
          <MenuItem eventKey={i} key={m.slug} onSelect={handleSelect}>
            {m.title}
          </MenuItem>
        ))}
    </SplitButton>

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

ModelView.propType = ModelProps

export default ModelView
