// @flow

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

type VariableListType = Array<VariableType>

type HierarchyType = {
  code: string,
  label: string,
  groups: GroupsType,
  variables: VariableListType,
  map: Function, // FIXME: ditch map from type
}

export type { VariableType, VariableListType, GroupsType, HierarchyType }
