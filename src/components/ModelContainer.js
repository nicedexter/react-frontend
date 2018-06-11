// @flow

import React from 'react'
import PropTypes from 'prop-types' // flowlint-line untyped-import:off
import { graphql, compose } from 'react-apollo' // flowlint-line untyped-import:off

import { updateModel, getCurrentModel, allModels, saveModel } from '../graphql'
import ModelView from './ModelView'
import { ModelProps } from '../proptypes'

const propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  currentModel: ModelProps,
}

type Props = {
  loading: boolean,
  error?: Object,
  currentModel: ModelType,
}

class ModelContainer extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = { currentModel: {} }
    this.handleSave = this.handleSave.bind(this)
  }

  handleSave = async () => {
    const { saveModel, currentModel } = this.props
    try {
      await saveModel({
        variables: {
          variables: currentModel.variables.map(v => v.code).join(','),
          covariables: currentModel.covariables.map(v => v.code).join(','),
        },
      })
      // await resetCurrentModel()
      this.setState({ created: true })
    } catch (error) {
      this.setState({ error })
    }
  }

  handleSelect = eventKey => {
    console.log(eventKey)
    const { allModels } = this.props
    this.setState({ currentModel: allModels[eventKey] })
  }

  componentWillReceiveProps(props) {
    const { currentModel } = props
    this.setState({ currentModel })
  }

  render() {
    const { loading, error, allModels } = this.props
    const { currentModel } = this.state

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message}</p>

    return (
      <div>
        <ModelView
          allModels={allModels}
          currentModel={currentModel}
          handleSave={this.handleSave}
          handleSelect={this.handleSelect}
        />
      </div>
    )
  }
}

ModelContainer.propTypes = propTypes

export default compose(
  graphql(saveModel, { name: 'saveModel' }),
  graphql(updateModel, { name: 'updateModel' }),
  graphql(getCurrentModel, {
    props: ({ data: { loading, error, currentModel } }) => ({
      loading,
      error,
      currentModel,
    }),
  }),
  graphql(allModels, {
    props: ({ data: { loading, error, allModels } }) => ({
      loading,
      error,
      allModels,
    }),
  })
)(ModelContainer)
