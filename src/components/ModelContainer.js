// @flow

import React from 'react'
import PropTypes from 'prop-types' // flowlint-line untyped-import:off
import { graphql, compose } from 'react-apollo' // flowlint-line untyped-import:off

import { updateModel, getCurrentModel, saveModel } from '../graphql'
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

class ModelContainer extends React.PureComponent<Props> {
  constructor(props) {
    super(props)
    this.handleSave = this.handleSave.bind(this)
  }

  componentWillUpdate(nextProps) {
    console.log({ nextProps })
  }
  handleSave = async () => {
    const { saveModel, currentModel } = this.props
    try {
      await saveModel({
        variables: {
          ...currentModel,
        },
      })
      // await resetCurrentModel()
      this.setState({ created: true })
    } catch (error) {
      this.setState({ error })
    }
  }

  render() {
    const { loading, error, currentModel } = this.props

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message}</p>

    return (
      <div>
        <ModelView currentModel={currentModel} handleSave={this.handleSave} />
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
  })
)(ModelContainer)
