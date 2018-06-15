const typeDefs = `

type LocalModel {
    index: String
    title: String
    slug: String
    variables: [Variable]
    covariables: [Variable] 
    groupings: [Variable]
    filters: [Variable] 
    testingDatasets: [Variable]
    trainingDatasets: [Variable]
    validationDatasets: [Variable]
}
`

export default typeDefs
