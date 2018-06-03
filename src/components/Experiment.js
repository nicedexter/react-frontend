// @flow

import React from 'react'
import { Pager, Tabs, Tab } from 'react-bootstrap'
import ExplorationContainer from './ExplorationContainer'
import ModelContainer from './ModelContainer'

import './Experiment.css'

export default () => (
  <div>
    <Pager>
      <Pager.Item>Epidemiological Exploration</Pager.Item>
      {' > '}
      <Pager.Item disabled>Analysis</Pager.Item>
      <Pager.Item disabled>Experiment</Pager.Item>
    </Pager>

    <div>
      <div className="wrapper">
        <div className="box exploration">
          <h2>Epidemiological Exploration</h2>
          <ExplorationContainer />
        </div>
        <div className="box current-model">
          <h2>Current Model</h2>
          <ModelContainer />
          <h3>Available Algorithms</h3>
          <ul>
            <li>...</li>
          </ul>
        </div>
        <div className="box analysis">
          <Tabs>
            <Tab eventKey={1} title="Analysis">
              Analysis
            </Tab>
            <Tab eventKey={2} title="Experiment">
              Experiment
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
)
