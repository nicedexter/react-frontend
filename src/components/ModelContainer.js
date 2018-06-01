// @flow

import React from 'react'
import PropTypes from 'prop-types' // flowlint-line untyped-import:off
import { graphql, compose } from 'react-apollo' // flowlint-line untyped-import:off

import { createModel, getCurrentModel, updateModel } from '../graphql'
import ModelView from './ModelView'

const propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
}

type Props = {
  loading: boolean,
  error?: Object,
}

class ModelContainer extends React.PureComponent<Props> {
  state = {
    created: false,
    error: null,
  }

  // createModel = async () => {
  //   const { createModel, currentModel } = this.props
  //   try {
  //     await createModel({
  //       variables: {
  //         ...currentModel
  //       }
  //     })
  //     // await resetCurrentModel()
  //     this.setState({ created: true })
  //   } catch (error) {
  //     this.setState({ error })
  //   }
  // }

  handleClick = args => {
    const { updateModel } = this.props
    updateModel({
      variables: {
        index: 'mymodel',
        variables: args,
      },
    })
  }

  render() {
    const { loading, currentModel, updateModel } = this.props
    const { created, error } = this.state

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message}</p>

    return (
      <div>
        <ModelView currentModel={currentModel} />
      </div>
    )
  }
}

ModelView.propTypes = propTypes

export default compose(
  // graphql(createModel, { name: 'mymodel' }),
  // graphql(updateModel, { name: 'updateModel' }),
  graphql(getCurrentModel, {
    props: ({ data: { loading, currentModel } }) => ({ currentModel }),
  })
)(ModelContainer)
