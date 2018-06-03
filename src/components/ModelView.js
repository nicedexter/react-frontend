// @flow

import React from 'react'
import { Label, Button } from 'react-bootstrap'

import './Model.css'

export default ({ currentModel: { variables, covariables, filters } }) => (
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
