const typeDefs = `
type ModelQuery {
  variables: [Variable]
  coVariables: [Variable] # FIXME: covariables
  filters: String # FIXME: as JSON?
  groupings: [Variable] # FIXME: as covariable
  testingDatasets: [Variable]
  trainingDatasets: [Variable]
  validationDatasets: [Variable]
}

type Model {
  query: ModelQuery
  createdAt: String
  updatedAt: String
  description: String
  slug: String
  title: String
  valid: Boolean
}

type ExperimentResponse {
  uuid: String
  name: String
  result: String
}

type ExperimentParameter { # FIXME: ~ same as Parameter
  code: String
  value: String
}

type ExperimentAlgorithm { # FIXME: should be same type as in  mining?
  validation: Boolean
  code: String
  name: String
  parameters: [ExperimentParameter]
} 

type RunExperimentResponse {
  uuid: String
  name: String
  hasError: Boolean
  hasServerError: Boolean
  shared: Boolean
  resultsViewed: Boolean
  algorithms: [ExperimentAlgorithm]
}

type AlgorithmConstraintProp {
  min_count: Int
  binominal: Boolean
  integer: Boolean
  polynominal: Boolean
  real: Boolean
}

type AlgorithmConstraint {
  covariables: AlgorithmConstraintProp
  grouping: AlgorithmConstraintProp
  variable: AlgorithmConstraintProp #FIXME: variables ?
  mixed: Boolean
}

type Algorithm {
  code: String!
  label: String
  description: String
  type: [String]
  docker_image: String
  environment: String
  constraints: AlgorithmConstraint
  parameters: [Parameter]
}

type Metric {
  code: String
  label: String
  tooltip: String
  type: String
}

type Metrics {
  binominal_classification: [Metric]
  classification: [Metric]
  regression: [Metric]
}

type Constraint {
  min: String
  max: String
}

type Parameter {
  code: String
  label: String
  description: String
  default_value: String
  type: String
  constraints: Constraint
}

type Validation {
  code: String
  label: String
  parameters: [Parameter]
}

type Methods {
  algorithms: [Algorithm]
  metrics: Metrics
  validations: [Validation]
}

type MiningResponse {
  jobId: String
  node: String
  function: String
  shape: String
  timestamp: String
  data: String # FIXME: or not, stringified json for now
}

type Code {
  code: String!
}

type Element {
  code: String
  label: String
}

type Variable {
  code: String
  label: String
  type: String
  sql_type: String
  description: String
  methodology: String
  enumerations: [Element]
  group: Element
  isVariable: Boolean
}

type Group {
  code: String
  label: String
  groups: [Group]
}
`

export default typeDefs
