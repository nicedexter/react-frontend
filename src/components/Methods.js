import React from 'react'

import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap'

import { graphql, compose } from 'react-apollo'
import { getMethods } from '../graphql'

class Methods extends React.PureComponent {
  render() {
    const { loading, error, methods } = this.props

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message}</p>

    const statistics = methods.algorithms.filter(a =>
      a.type.includes('statistics')
    )

    const extraction = methods.algorithms.filter(a =>
      a.type.includes('features_extraction')
    )
    const predictive = methods.algorithms.filter(a =>
      a.type.includes('predictive_model')
    )

    return (
      <React.Fragment>
        <Panel>
          <Panel.Heading>Statistics</Panel.Heading>
          <ListGroup>
            {statistics.map(a => <ListGroupItem>{a.label}</ListGroupItem>)}
          </ListGroup>
        </Panel>
        <Panel>
          <Panel.Heading>Extraction</Panel.Heading>
        <ListGroup>
          {extraction.map(a => <ListGroupItem>{a.label}</ListGroupItem>)}
        </ListGroup>
        </Panel>
        <Panel>
          <Panel.Heading>Predictive</Panel.Heading>
        <ListGroup>
          {predictive.map(a => <ListGroupItem>{a.label}</ListGroupItem>)}
        </ListGroup>
        </Panel>
      </React.Fragment>
    )
  }
}

export default compose(
  graphql(getMethods, {
    props: ({ data: { loading, error, methods } }) => ({
      loading,
      error,
      methods,
    }),
  })
)(Methods)
