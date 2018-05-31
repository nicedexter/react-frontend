// @flow

import React from 'react'
import HierarchyContainer from './HierarchyContainer'
import './Home.css'

export default () => (
  <div>
    <h4>Epidemiological Exploration</h4>
    <div className="wrapper">
      <div className="box a">
        <HierarchyContainer />
      </div>
      <div className="box b">Model</div>
      <div className="box c">C</div>
      <div className="box d">D</div>
    </div>
  </div>
)
