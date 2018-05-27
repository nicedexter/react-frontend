// @flow

import React from 'react'
import PropTypes from 'prop-types' // flowlint-line untyped-import:off
import { graphql, compose } from 'react-apollo' // flowlint-line untyped-import:off
import allVariables from '../graphql/allvariables'

const propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  variables: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      label: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
}

const Variables = ({ loading, error, variables }) => {
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return variables.map(({ code, label, description }) => (
    <p key={code} title={`${description}`}>
      {`${label}`}
    </p>
  ))
}

Variables.propTypes = propTypes

export default compose(
  graphql(allVariables, {
    props: ({ data: { loading, error, variables } }) => ({
      loading,
      error,
      variables,
    }),
  })
)(Variables)
