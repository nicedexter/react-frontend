import React from 'react'

import { graphql, compose } from 'react-apollo'
import { getCurrentModel, summary } from '../graphql'

import ReactTable from 'react-table'
import 'react-table/react-table.css'

class Analysis extends React.PureComponent {
  render() {
    const { loading, error, currentModel, summary } = this.props

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message}</p>
    if (!summary || !summary.data) return <p>Nothing to show yet</p>

    const fields = summary.schema.fields.filter(f => f.type !== 'array').filter(f => f.name !== 'index').filter(f => f.name !== 'top')
    const columns = fields.map(f => ({
      Header: f.name,
      accessor: f.name,
    }))

    const data = summary.data.map(row => {
      let o = {}
      Object.entries(row).forEach((arr) => {
        o[arr[0]] = arr[1] != null && arr[1].constructor === Object ? JSON.stringify(arr[1]) : arr[1]
      })
      return o
    })

    return <ReactTable 
      data={data} 
      columns={columns}
      defaultPageSize={data.length}
      showPagination={false}
      className="-striped -highlight"
      style={{
        width: "100%"
      }}
      />
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
  graphql(summary, {
    name: 'getSummary',
    skip: ({ currentModel }) => currentModel.variables.length === 0,
    options: ({ currentModel }) => ({
      variables: {
        variables: currentModel.variables.map(v => v.code).join(','),
        covariables: currentModel.covariables.map(v => v.code).join(','),
      },
    }),
    props: ({ getSummary: { loading, error, summary } }) => ({
      loading,
      error,
      summary: summary ? JSON.parse(summary.data) : {},
    }),
  })
)(Analysis)
