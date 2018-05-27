// @flow

import React from 'react'
import { graphql, compose } from 'react-apollo' // flowlint-line untyped-import:off
import allVariables from '../graphql/allvariables'

const Variables = ({ loading, error, variables }) => {
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return variables.map(({ code, label, description }) => (
    <p key={code} title={`${description}`}>
      {`${label}`}
    </p>
  ))
}

export default compose(
  graphql(allVariables, {
    props: ({ data: { loading, error, variables } }) => ({
      loading,
      error,
      variables,
    }),
  })
)(Variables)
