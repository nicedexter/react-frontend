// @flow

import PropTypes from 'prop-types' // flowlint-line untyped-import:off

const ElementProps = PropTypes.shape({
  code: PropTypes.string.isRequired,
  label: PropTypes.string,
})

const VariableProps = PropTypes.shape({
  code: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  sql_type: PropTypes.string,
  description: PropTypes.string,
  methodology: PropTypes.string,
  enumerations: PropTypes.arrayOf(ElementProps),
  group: ElementProps,
  isVariable: PropTypes.bool,
})

const VariableListProps = PropTypes.arrayOf(VariableProps)

const groups = {
  code: PropTypes.string.isRequired,
  label: PropTypes.string,
  groups: PropTypes.object,
}
groups.groups = PropTypes.arrayOf(PropTypes.shape(groups))
const GroupsProps = PropTypes.shape(groups)

export { VariableListProps, GroupsProps }
