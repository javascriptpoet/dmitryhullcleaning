import gql from "graphql-tag"

const typeDefs = gql`
  enum EventType {
    NEW_CONTACT
  }
  type Log {
    id: ID
    message: String
    dateCreated: String
    ownerId: ID
  }
  input AddLog {
    message: String
  }

  extend type Mutation {
    addLog(input: AddLog): Log
    updateLog(id: ID, updater: AddLog): Log
    deleteLog(id: ID): ID
  }
`
const resolvers = {}

export default { typeDefs, resolvers }
