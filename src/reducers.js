// @flow

import {
    cond,
    equals,
    T
} from 'ramda'

export const LOAD_VARIABLES = 'LOAD_VARIABLES'
export const LOAD_GROUPS = 'LOAD_GROUPS'
export const LOAD_DATASETS = 'LOAD_DATASETS'
export const LOAD_METHODS = 'LOAD_METHODS'

const initialState = {
    variables: [],
    groups: [],
    datasets: [],
    methods: [],
    user: {},
}

export const rootReducer = (state = initialState, action) =>
    cond([
        [equals(LOAD_VARIABLES), ({...state,
            variables: action.payload
        })],
        [equals(LOAD_GROUPS), ({...state,
            groups: action.payload
        })],
        [equals(LOAD_DATASETS), ({...state,
            datasets: action.payload
        })],
        [equals(LOAD_METHODS), ({...state,
            methods: action.payload
        })],
        [T, ({...state
        })],
    ])