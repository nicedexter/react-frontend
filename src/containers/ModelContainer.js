// @flow

import React from 'react'
import PropTypes from 'prop-types' // flowlint-line untyped-import:off
import { graphql, compose } from 'react-apollo' // flowlint-line untyped-import:off

import { updateCurrentModel, currentModel, models, saveModel, datasets } from '../graphql'
import { Model } from '../components'
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
    const { models } = this.props
    this.setState({ currentModel: models[eventKey] })
  }

  componentWillReceiveProps(props) {
    const { currentModel } = props
    this.setState({ currentModel })
  }

  render() {
    const { loading, error, models, datasets } = this.props
    const { currentModel } = this.state

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message}</p>

    return (
      <div>
        <Model
          models={models}
          datasets={datasets}
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
  graphql(updateCurrentModel, { name: 'updateCurrentModel' }),
  graphql(currentModel, {
    props: ({ data: { loading, error, currentModel } }) => ({
      loading,
      error,
      currentModel,
    }),
  }),
  graphql(models, {
    props: ({ data: { loading, error, models } }) => ({
      loading,
      error,
      models,
    }),
  }),
  graphql(datasets, {
    props: ({ data: { loading, error, datasets } }) => ({
      loading,
      error,
      datasets,
    }),
  })
)(ModelContainer)
