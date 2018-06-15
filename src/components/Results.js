import React from 'react'
import { Query } from 'react-apollo' // flowlint-line untyped-import:off
import { Tabs, Tab } from 'react-bootstrap'

import { experiments } from '../graphql'

export default ({ data }) => (
  <Query query={experiments} skip={data} pollInterval={200000}>
    {({ loading, error, data, startPolling, stopPolling }) => {
      console.log({
        loading,
        error,
        data,
        startPolling,
        stopPolling,
      })
      if (loading) return null
      if (error) return `Error!: ${error}`

      const { experiments } = data

      return (
        <Tabs id="results-tabs">
          {experiments &&
            experiments.map((e, i) => (
              <Tab key={e.uuid} eventKey={i} title={e.name}>
                <pre>{JSON.stringify(JSON.parse(e.result), null, 2)}</pre>
              </Tab>
            ))}
        </Tabs>
      )
    }}
  </Query>
)
