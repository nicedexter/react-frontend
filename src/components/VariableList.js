// @flow

import React from 'react'
import { VariableListProps } from '../proptypes'
import type { VariableListType } from '../flowtypes'

type V = {
  variables: VariableListType,
}

const Variables = ({ variables }: V) =>
  variables.map(({ code, label, description }) => (
    <p key={code} title={description}>
      {label}
    </p>
  ))

Variables.propTypes = VariableListProps.isRequired

export default Variables
