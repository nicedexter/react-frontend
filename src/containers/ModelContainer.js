// @flow

import React from 'react'
import PropTypes from 'prop-types' // flowlint-line untyped-import:off
import { graphql, compose } from 'react-apollo' // flowlint-line untyped-import:off

import {
  updateCurrentModel,
  currentModel,
  models,
  saveModel,
  datasets,
} from '../graphql'
import { Model, ModalTitleInput } from '../components'
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
    this.state = { currentModel: {}, showModal: false }
  }

  handleSave = () => {
    const { saveModel, currentModel } = this.props
    this.setState({ showModal: true })
  }

  handleSaveModal = async (event, value) => {
    event.preventDefault()
    console.log('handleSaveModal', value)
    const { saveModel, currentModel, updateCurrentModel } = this.props

    const nextModel = {}
    const { title, slug, __typename, ...others } = currentModel
    nextModel.title = value
    nextModel.slug = slug

    Object.keys(others).map(name => {
      const elements = currentModel[name]
      if (!elements) return

      nextModel[name] = elements.map(e => ({ code: e.code }))
    })

    try {
      const newModel = await saveModel({
        variables: {
          ...nextModel,
        },
      })

      updateCurrentModel({ variables: { slug: newModel.slug, title: value } })

      this.setState({ showModal: false })
    } catch (error) {
      console.log(error)
      this.setState({ error: error.message })
    }
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  handleSelect = eventKey => {
    console.log(eventKey)
    const { models, updateCurrentModel } = this.props
    const { title, slug, query, __typename } = models[eventKey]
    const variables = Object.assign(
      {},
      { ...query },
      { covariables: query.coVariables },
      { coVariables: [] },
      { filters: [] },
      { title, slug }
    )
    updateCurrentModel({ variables })
  }

  handleDelete = (_, variable, type) => {
    const { updateCurrentModel } = this.props
    let variables = {}
    if (type === 'variables') variables = { variables: [variable] }
    if (type === 'covariables') variables = { covariables: [variable] }
    if (type === 'filters') variables = { filters: [variable] }

    updateCurrentModel({ variables })
  }

  componentWillReceiveProps(props) {
    const { currentModel } = props
    this.setState({ currentModel })
  }

  render() {
    const { loading, error, models, datasets } = this.props
    const { currentModel, showModal } = this.state

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message}</p>

    return (
      <div>
        {showModal && (
          <ModalTitleInput
            error={this.state.error}
            handleClose={this.handleCloseModal}
            handleSave={this.handleSaveModal}
          />
        )}
        <Model
          models={models}
          datasets={datasets}
          currentModel={currentModel}
          handleSave={this.handleSave}
          handleSelect={this.handleSelect}
          handleDelete={this.handleDelete}
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
