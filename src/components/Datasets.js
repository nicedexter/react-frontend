// @flow

import React from 'react'

import { graphql } from 'react-apollo' // flowlint-line untyped-import:off
import { datasets } from '../graphql'

const Datasets = ({ loading, error, datasets }) => {
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error {error.message}</p>

  return <p>{datasets && datasets.map(d => d.label)}</p>
}

export default graphql(datasets, {
  props: ({ data: { loading, error, datasets } }) => ({
    loading,
    error,
    datasets,
  }),
})(Datasets)
