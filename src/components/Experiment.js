// @flow

import React from 'react'
import { Pager } from 'react-bootstrap'
import Exploration from './Exploration'

export default () => (
  <div>
    <Pager>
      <Pager.Item>Exploration</Pager.Item>
      {' > '}
      <Pager.Item disabled>Analysis</Pager.Item>
      {' > '}
      <Pager.Item disabled>Experiment</Pager.Item>
    </Pager>

    <Exploration />
  </div>
)