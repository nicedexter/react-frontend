// @flow

import PropTypes from 'prop-types' // flowlint-line untyped-import:off

const ElementProps = PropTypes.shape({
  code: PropTypes.string,
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

const HierarchyNodeProps = PropTypes.shape({
  code: PropTypes.string.isRequired,
  label: PropTypes.string,
  groups: PropTypes.arrayOf(GroupsProps),
  variables: VariableListProps,
})
const HierarchyProps = PropTypes.arrayOf(HierarchyNodeProps)

const TreeViewProps = {
  collapsed: PropTypes.bool,
  defaultCollapsed: PropTypes.bool,
  nodeLabel: PropTypes.node.isRequired,
  nodeIcon: PropTypes.node,
}

const ModelProps = PropTypes.shape({
  variables: VariableListProps,
  covariables: VariableListProps,
  filters: VariableListProps,
})

export { ModelProps, HierarchyProps, TreeViewProps }
