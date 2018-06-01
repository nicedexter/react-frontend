// @flow

import React from 'react'
import HierarchyContainer from './HierarchyContainer'
import ModelContainer from './ModelContainer'

import './Exploration.css'

export default () => (
  <div>
    <div className="wrapper">
      <div className="box a">
        <h2>Epidemiological Exploration</h2>
        <HierarchyContainer />
      </div>
      <div className="box b">
        <h2>My Model</h2>
        <ModelContainer />
      </div>
      <div className="box c">C</div>
      <div className="box d">D</div>
    </div>
  </div>
)
