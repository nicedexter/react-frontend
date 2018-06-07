// @flow

import React from 'react'
import { Query } from 'react-apollo'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Tabs, Tab, Panel } from 'react-bootstrap'

import { histogram } from '../graphql'

type Props = {
  model: VariableType,
}

class Chart extends React.PureComponent<Props> {
  state = { variables: null }

  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  chartTitle = previousTitle => {
    const nextTitle = previousTitle.replace(
      `${this.state.variables.label} histogram`,
      ''
    )
    if (nextTitle.length === 0) {
      return 'All'
    }
    return nextTitle.replace('by ', '')
  }

  render() {
    const { variables } = this.state

    if (!variables) return <div />

    return (
      <div>
        <Query query={histogram} variables={{ variables: variables.code }}>
          {({ loading, error, data }) => {
            const json =
              data && data.mining && data.mining.data
                ? JSON.parse(data.mining.data)
                : null

            return (
              <Panel id="histogram-panel">
                <Panel.Heading>
                  <Panel.Title>
                    {variables.label} {loading && 'loading...'}{' '}
                    {error && `${error}`}
                  </Panel.Title>
                </Panel.Heading>

                {json && (
                    <Panel.Body>
                      <Tabs defaultActiveKey={0} id="highcharts-tabs">
                        {json.map((chart, i) => (
                          <Tab
                            eventKey={i}
                            title={this.chartTitle(chart.title.text)}
                            key={`${i}`}
                          >
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={chart}
                            />
                          </Tab>
                        ))}
                      </Tabs>
                    </Panel.Body>
                )}
                {error && <Panel.Body>`${error}`</Panel.Body>}
              </Panel>
            )
          }}
        </Query>
      </div>
    )
  }
}

// Chart.propTypes = HierarchyProps.isRequired
export default Chart
