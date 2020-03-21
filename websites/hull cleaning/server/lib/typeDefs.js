import gql from "graphql-tag"

const typeDefs = gql`
  type Void {
    void: Boolean
  }
  type Mutation {
    void: Void
  }
  type Query {
    void: Void
  }
`
export default typeDefs
