// @flow

import React from 'react'
import { Label } from 'react-bootstrap'

import './Model.css'

export default ({ currentModel: { variables, covariables, filters } }) => (
  <div>
    <div className="variables">
      <h4>Variables</h4>
      {variables &&
        variables.map(v => (
          <h4>
            <Label>{v}</Label>
          </h4>
        ))}
    </div>
    <div className="covariables">
      <h4>Covariables</h4>
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
