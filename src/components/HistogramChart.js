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
  state = { variable: null }

  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  chartTitle = previousTitle => {
    const nextTitle = previousTitle.replace(
      `${this.state.variable.label} histogram`,
      ''
    )
    if (nextTitle.length === 0) {
      return 'All'
    }
    return nextTitle.replace('by ', '')
  }

  render() {
    const { variable } = this.state

    if (!variable) return <div />

    return (
      <div>
        <Query query={histogram} variables={{ variable: variable.code }}>
          {({ loading, error, data }) => {
            const json =
              data && data.histogram && data.histogram.data
                ? JSON.parse(data.histogram.data)
                : null
            return (
              <Panel id="panel" defaultExpanded>
                <Panel.Heading>
                  <Panel.Title toggle>
                    {variable.label} {loading && 'loading...'}{' '}
                    {error && `${error}`}
                  </Panel.Title>
                </Panel.Heading>

                {json && (
                  <Panel.Collapse>
                    <Panel.Body collapsible>
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
                  </Panel.Collapse>
                )}
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
