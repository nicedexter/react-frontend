// @flow

import React from 'react'
import { Label, Button } from 'react-bootstrap'

import './Model.css'
import { ModelProps } from '../proptypes'

const ModelView = ({
  handleSave,
  currentModel: { variables, covariables, filters },
}: {
  currentModel: ModelType,
}) => (
  <div>
    <Button bsSize="small" onClick={handleSave} style={{ width: '100%' }}>
      Save
    </Button>
    <div className="variables">
      <h4>Variables ({variables.length}/1)</h4>
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
  </div>
)

ModelView.propType = ModelProps

export default ModelView
