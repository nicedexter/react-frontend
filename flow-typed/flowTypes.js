// @flow

import type { Node } from 'react'

declare type VarElement = {
  code: string,
  label?: string,
}

declare type VariableType = {
  code: string,
  label?: string,
  type?: string,
  sql_type?: string,
  description?: string,
  methodology?: string,
  enumerations?: VarElement[],
  group: VarElement,
  isVariable: boolean,
}

declare type GroupsType = {
  code: string,
  label?: string,
  groups?: GroupsType[],
  variables?: VariableType[],
}

declare type TreeViewType = {
  collapsed?: boolean,
  defaultCollapsed?: boolean,
  nodeLabel: Node,
  onClick?: Function,
  children: Node,
  nodeIcon?: Node,
  key?: string,
}

declare type ModelType = {
  variables: VariableType[],
  covariables: VariableType[],
  filters: VariableType[],
}
