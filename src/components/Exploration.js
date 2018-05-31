// @flow

import React from 'react'
import HierarchyContainer from './HierarchyContainer'

import './Exploration.css'

export default () => (
  <div>
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
