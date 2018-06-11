import React from 'react'
import { Query } from 'react-apollo' // flowlint-line untyped-import:off
import { Tabs, Tab } from 'react-bootstrap'

import { getExperiments } from '../graphql'

export default ({ data }) => (
  <Query query={getExperiments} skip={data} pollInterval={200000}>
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

      const { getExperiments } = data

      return (
        <Tabs id="results-tabs">
          {getExperiments &&
            getExperiments.map((e, i) => (
              <Tab key={e.uuid} eventKey={i} title={e.name}>
                <pre>{JSON.stringify(JSON.parse(e.result), null, 2)}</pre>
              </Tab>
            ))}
        </Tabs>
      )
    }}
  </Query>
)
