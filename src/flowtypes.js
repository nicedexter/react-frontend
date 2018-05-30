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
}

type VariableListType = Array<VariableType>

export type { VariableType, VariableListType, GroupsType }
