import React from 'react'

import { Panel } from 'react-bootstrap'

import Methods from './Methods'
import { graphql, compose } from 'react-apollo'
import { getCurrentModel, getMethods } from '../graphql'

import './Experiment.css'
class Experiment extends React.PureComponent {
  state = {
    currentMethod: {},
  }

  handleClick = (method, event) => {
    event.preventDefault()
    this.setState({ currentMethod: method })
  }

  render() {
    const { loading, error, methods } = this.props
    const { currentMethod } = this.state

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
              <Panel.Title>Your Experiment</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <h3>{currentMethod.label}</h3>
              <p>{currentMethod.description}</p>
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
  graphql(getCurrentModel, {
    props: ({ data: { loading, error, currentModel } }) => ({
      loading,
      error,
      currentModel,
    }),
  }),
  graphql(getMethods, {
    props: ({ data: { loading, error, methods } }) => ({
      loading,
      error,
      methods,
    }),
  })
)(Experiment)
