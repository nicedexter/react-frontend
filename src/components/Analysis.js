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

    console.log(summary)
    if (summary.summary) return <div>{summary.summary.data}</div>

    const data = [
      {
        name: 'Tanner Linsley',
        age: 26,
        friend: {
          name: 'Jason Maurer',
          age: 23,
        },
      },
      {
        name: 'Tanner Linsley',
        age: 22,
        friend: {
          name: 'Jason Maurer',
          age: 23,
        },
      },
      {
        name: 'Tanner Linsley',
        age: 23,
        friend: {
          name: 'Jason Maurer',
          age: 23,
        },
      },
    ]

    const columns = [
      {
        Header: 'Name',
        accessor: 'name', // String-based value accessors!
      },
      {
        Header: 'Age',
        accessor: 'age',
        Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
      },
      {
        id: 'friendName', // Required because our accessor is not a string
        Header: 'Friend Name',
        accessor: d => d.friend.name, // Custom value accessors!
      },
      {
        Header: props => <span>Friend Age</span>, // Custom header components!
        accessor: 'friend.age',
      },
    ]

    return <ReactTable data={data} columns={columns} />
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
    name: 'summary',
    skip: ({ currentModel }) => !currentModel.variables,
    options: ({ currentModel }) => ({
      variables: {
        variables: currentModel.variables.map(v => v.code).join(','),
        covariables: currentModel.covariables.map(v => v.code).join(','),
      },
      props: ({ data: { loading, error, summary } }) => ({
        loading,
        error,
        summary,
      }),
    }),
  })
)(Analysis)
