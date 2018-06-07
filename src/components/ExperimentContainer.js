// @flow

import React from 'react'
import { Panel, Pager } from 'react-bootstrap'
import ExplorationContainer from './ExplorationContainer'
import ModelContainer from './ModelContainer'
import Analysis from './Analysis'
import Experiment from './Experiment'

import './ExperimentContainer.css'

class ExperimentController extends React.PureComponent {
  constructor(props, context) {
    super(props, context)

    this.handleSelect = this.handleSelect.bind(this)

    this.state = {
      activeKey: '1',
    }
  }

  handleSelect(activeKey) {
    this.setState({ activeKey })
  }

  render() {
    return (
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
              <Panel id="panel-exploration" defaultExpanded>
                <Panel.Heading>
                  <Panel.Title toggle>Epidemiological Exploration</Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body collapsible>
                    <ExplorationContainer />
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>
              <Panel id="panel-analysis" defaultExpanded>
                <Panel.Heading>
                  <Panel.Title toggle>Analysis</Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body collapsible>
                    <Analysis />
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>
              <Panel id="panel-experiment" eventKey="3">
                <Panel.Heading>
                  <Panel.Title toggle>Experiment</Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                  <Panel.Body collapsible>
                    <Experiment />
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>
            </div>
            <div className="box current-model">
              <Panel id="panel-model" defaultExpanded>
                <Panel.Heading>
                  <Panel.Title>Current Model</Panel.Title>
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
  }
}

export default ExperimentController
