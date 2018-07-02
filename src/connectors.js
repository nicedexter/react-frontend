import * as R from 'ramda'
import { connect } from 'react-redux';

export const variablesConnector = compose(
    connect(({ state: variables }) => ({ variables })))

export const groupsConnector = compose(
    connect(state => ({ groups: state.groups }))
)

export const datasetsConnector = compose(
    connect(state => ({ datasets: state.datasets }))
)

export const methodsConnector = compose(
    connect(state => ({ methods: state.methods }))
)