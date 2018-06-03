// @flow

import React from 'react'
import { Panel, Pager, Tabs, Tab } from 'react-bootstrap'
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
          <Panel id="collapsible-exploration" defaultExpanded>
            <Panel.Heading>
              <Panel.Title toggle>Epidemiological Exploration</Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
              <Panel.Body>
                <ExplorationContainer />
              </Panel.Body>
            </Panel.Collapse>
          </Panel>
          <Panel id="collapsible-analysis" defaultExpanded>
            <Panel.Heading>
              <Panel.Title toggle>Analysis</Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
              <Panel.Body />
            </Panel.Collapse>
          </Panel>
          <Panel id="collapsible-experiment" defaultExpanded>
            <Panel.Heading>
              <Panel.Title toggle>Experiment</Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
              <Panel.Body />
            </Panel.Collapse>
          </Panel>
        </div>
        <div className="box current-model">
          <Panel id="collapsible-exploration" defaultExpanded>
            <Panel.Heading>
              <Panel.Title toggle>Current Model</Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
              <Panel.Body>
                <ModelContainer />
              </Panel.Body>
            </Panel.Collapse>
          </Panel>
        </div>
      </div>
    </div>
  </div>
)
