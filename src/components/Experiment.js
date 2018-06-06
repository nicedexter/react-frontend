import React from 'react'

import { Panel } from 'react-bootstrap'

import Methods from './Methods'
import { graphql, compose } from 'react-apollo'
import { getCurrentModel, summary } from '../graphql'

import './Experiment.css'
class Experiment extends React.PureComponent {
  render() {
    const { loading, error } = this.props

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
              <Methods />
            </Panel.Body>
          </Panel>
        </div>
        <div className="your-experiment">
          <Panel>
          <Panel.Heading>
              <Panel.Title>Your Experiment</Panel.Title>
            </Panel.Heading>
            <Panel.Body></Panel.Body>
          </Panel>
        </div>
        <div className="training-validation">
          <Panel>
          <Panel.Heading>
              <Panel.Title>Training & Validation</Panel.Title>
            </Panel.Heading>
            <Panel.Body></Panel.Body>
          </Panel>
        </div>
        <div className="about">
          <Panel>
          <Panel.Heading>
              <Panel.Title>About</Panel.Title>
            </Panel.Heading>
            <Panel.Body></Panel.Body>
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
  })
  //   graphql(summary, {
  //     name: 'getSummary',
  //     skip: ({ currentModel }) => currentModel.variables.length === 0,
  //     options: ({ currentModel }) => ({
  //       variables: {
  //         variables: currentModel.variables.map(v => v.code).join(','),
  //         covariables: currentModel.covariables.map(v => v.code).join(','),
  //       },
  //     }),
  //     props: ({ getSummary: { loading, error, summary } }) => ({
  //       loading,
  //       error,
  //       summary: summary ? JSON.parse(summary.data) : {},
  //     }),
  //   })
)(Experiment)
