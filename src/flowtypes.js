// @flow

import type { Node } from 'react'

type Element = {
  code: string,
  label: string,
}

type VariableType = {
  code: string,
  label: string,
  type: string,
  sql_type: string,
  description: string,
  methodology: string,
  enumerations: Array<Element>,
  group: Element,
  isVariable: boolean,
}

type GroupsType = {
  code: string,
  label: string,
  groups: Array<GroupsType>,
  variables: Array<VariableType>,
}

type HierarchyArrayType = Array<{
  code: string,
  label: string,
  groups: Array<GroupsType>,
  variables: Array<VariableType>,
}>

type TreeViewType = {
  collapsed?: boolean,
  defaultCollapsed?: boolean,
  nodeLabel: Node,
  onClick?: Function,
  children: Node,
}

export type { VariableType, GroupsType, HierarchyArrayType, TreeViewType }
