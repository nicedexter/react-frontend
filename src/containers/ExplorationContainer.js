// @flow

import React from 'react'
import PropTypes from 'prop-types' // flowlint-line untyped-import:off
import * as R from 'ramda'

import {
  withVariableHierarchy,
  withUpdateCurrentModel,
  withCurrentModel
} from '../graphql/connectors'
import { Exploration } from '../components'
import { HierarchyProps } from '../proptypes'

const propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  hierarchy: HierarchyProps.isRequired,
}

type Props = {
  loading: boolean,
  error?: Object,
  updateCurrentModel: Function,
  hierarchy: GroupsType[],
}

class ExplorationContainer extends React.PureComponent<Props> {
  handleClick = (variables, type) => {
    const { updateCurrentModel } = this.props
    const nextModel = {}
    if (type === 'variable') {
      nextModel.variables = variables
    } else if (type === 'covariable') {
      nextModel.covariables = variables
    }
    updateCurrentModel({ variables: nextModel })
  }

  render() {
    const { loading, error, hierarchy, currentModel } = this.props

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message}</p>

    return (
      <div>
        <Exploration
          hierarchy={hierarchy}
          currentModel={currentModel}
          handleClick={this.handleClick}
        />
      </div>
    )
  }
}

ExplorationContainer.propTypes = propTypes

export default R.compose(
  withVariableHierarchy,
  withCurrentModel,
  withUpdateCurrentModel
)(ExplorationContainer)
