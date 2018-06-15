import React from 'react'

import { Panel, Button } from 'react-bootstrap'

import Methods from './Methods'
import { graphql, compose } from 'react-apollo'
import { currentModel, methods, runExperiments } from '../graphql'

import './Experiment.css'
class Experiment extends React.Component {
  state = {
    currentMethod: {},
    currentExperiment: [],
  }

  constructor(props) {
    super(props)
    this.handleAddToExperiment = this.handleAddToExperiment.bind(this)
  }

  handleClick = (method, event) => {
    event.preventDefault()
    this.setState({ currentMethod: method })
  }

  handleAddToExperiment = event => {
    event.preventDefault()
    const { currentExperiment, currentMethod } = this.state
    if (!currentExperiment.includes(currentMethod)) {
      currentExperiment.push(currentMethod)
      this.setState({ currentExperiment })
    }
  }

  handleRunExperiment = async event => {
    event.preventDefault()
    const { runExperiments } = this.props
    const { currentExperiment } = this.state

    try {
      runExperiments({
        variables: {
          name: 'test',
          model: 'test',
          algorithms: currentExperiment.map(m => m.code).join(','),
        },
      })
    } catch (error) {
      console.log(error)
    }

    this.setState({ created: true })
  }

  render() {
    const { loading, error, methods, runExperiments } = this.props
    const { currentMethod, currentExperiment } = this.state

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message}</p>

    return (
      <div className="wrapper">
        <div className="methods">
          <Panel>
            <Panel.Heading>
              <Panel.Title>Methods</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Methods methods={methods} handleClick={this.handleClick} />
            </Panel.Body>
          </Panel>
        </div>
        <div className="your-experiment">
          <Panel>
            <Panel.Heading>
              <Panel.Title>Parameters</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              {currentMethod.label && (
                <div>
                  <h3>{currentMethod.label}</h3>
                  <p>{currentMethod.description}</p>

                  <Button bsSize="xsmall" onClick={this.handleAddToExperiment}>
                    Add to experiment
                  </Button>
                </div>
              )}
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Heading>
              <Panel.Title>Your Experiment</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              {currentExperiment.length > 0 && (
                <div>
                  {currentExperiment.map(e => <h5 key={e.code}>{e.label}</h5>)}
                  <Button bsSize="xsmall" onClick={this.handleRunExperiment}>
                    Run Experiment
                  </Button>
                </div>
              )}
            </Panel.Body>
          </Panel>
        </div>
        <div className="training-validation">
          <Panel>
            <Panel.Heading>
              <Panel.Title>Training & Validation</Panel.Title>
            </Panel.Heading>
            <Panel.Body />
          </Panel>
        </div>
        <div className="about">
          <Panel>
            <Panel.Heading>
              <Panel.Title>About</Panel.Title>
            </Panel.Heading>
            <Panel.Body />
          </Panel>
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(runExperiments, { name: 'runExperiments' }),
  graphql(currentModel, {
    props: ({ data: { loading, error, currentModel } }) => ({
      loading,
      error,
      currentModel,
    }),
  }),
  graphql(methods, {
    props: ({ data: { loading, error, methods } }) => ({
      loading,
      error,
      methods,
    }),
  })
)(Experiment)
