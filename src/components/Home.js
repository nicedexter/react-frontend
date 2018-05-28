// @flow

import React from 'react'
import VariableContainer from './VariableContainer'
import { Jumbotron } from 'react-bootstrap' // flowlint-line untyped-import:off

export default () => (
  <div>
    <h2> Home </h2>
    <Jumbotron>
      <h1>Hello MIP</h1>
    </Jumbotron>
    <VariableContainer />
  </div>
)
