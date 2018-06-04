// @flow

import React from 'react'
import { Label, Button } from 'react-bootstrap'

import './Model.css'
import { ModelProps } from '../proptypes'

const ModelView = ({
  currentModel: { variables, covariables, filters },
}: {
  currentModel: ModelType,
}) => (
  <div>
    <Button bsStyle="primary">Save</Button>
    <div className="variables">
      <h4>Variables ({variables.length}/1)</h4>
      {variables &&
        variables.map(v => (
          <h4>
            <Label>{v}</Label>
          </h4>
        ))}
    </div>
    <div className="covariables">
      <h4>Covariables ({(covariables && covariables.length) || 0})</h4>
      {covariables &&
        covariables.map(v => (
          <h4>
            <Label>{v}</Label>
          </h4>
        ))}
    </div>
    <div className="filters">
      <h4>Filters</h4>
      {filters &&
        filters.map(v => (
          <h4>
            <Label>{v}</Label>
          </h4>
        ))}
    </div>
  </div>
)

ModelView.propType = ModelProps

export default ModelView
