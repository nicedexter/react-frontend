import React from 'react'

import { graphql, compose } from 'react-apollo'
import { currentModel, summary } from '../graphql'

import ReactTable from 'react-table'
import 'react-table/react-table.css'

class Analysis extends React.PureComponent {
  render() {
    const { loading, error, mining } = this.props

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message}</p>
    if (!mining || !mining.data) return <p>Nothing to show yet</p>

    const fields = mining.schema.fields
      .filter(f => f.type !== 'array')
      .filter(f => f.name !== 'index')
      .filter(f => f.name !== 'top')
    const columns = fields.map(f => ({
      Header: f.name,
      accessor: f.name,
    }))

    const data = mining.data.map(row => {
      let o = {}
      Object.entries(row).forEach(arr => {
        o[arr[0]] =
          arr[1] != null && arr[1].constructor === Object
            ? JSON.stringify(arr[1])
            : arr[1]
      })
      return o
    })

    return (
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={data.length}
        showPagination={false}
        className="-striped -highlight"
        style={{
          width: '100%',
        }}
      />
    )
  }
}

export default compose(
  graphql(currentModel, {
    props: ({ data: { loading, error, currentModel } }) => ({
      loading,
      error,
      currentModel,
    }),
  }),
  graphql(summary, {
    name: 'getSummary',
    skip: ({ currentModel }) =>
      currentModel === undefined || currentModel.query.variables.length === 0,
    options: ({ currentModel }) => ({
      variables: {
        variables: currentModel.query.variables.map(v => v.code).join(','),
        covariables: currentModel.query.coVariables.map(v => v.code).join(','),
      },
    }),
    props: ({ getSummary: { loading, error, mining } }) => ({
      loading,
      error,
      mining: mining ? JSON.parse(mining.data) : {},
    }),
  })
)(Analysis)
