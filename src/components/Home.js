// @flow

import React from 'react'
import VariableContainer from './VariableContainer'
import './Home.css'

export default () => (
  <div>
    <h2>Epidemiological Exploration</h2>
    <div className="wrapper">
      <div className="box a">
        <VariableContainer />
      </div>
      <div className="box b">B</div>
      <div className="box c">C</div>
      <div className="box d">D</div>
    </div>
  </div>
)
