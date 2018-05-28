// @flow

import PropTypes from 'prop-types' // flowlint-line untyped-import:off

const VariableProps = PropTypes.shape({
  code: PropTypes.string.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
})

const VariableListProps = PropTypes.arrayOf(VariableProps)

export { VariableProps, VariableListProps }
