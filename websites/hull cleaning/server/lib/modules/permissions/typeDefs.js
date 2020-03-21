import gql from "graphql-tag"

const typeDefs = gql`
  extend type Query {
    resolvePermissions(
      allowedPermissions: [String]
      disallowedPermissions: [String]
    ): [String]
  }

  input LoginInput {
    username: String
    password: String
  }

  input SignupInput {
    username: String
    password: String
  }

  extend type Mutation {
    upsertRole(name: String, permissions: [String]): [String]
    upsertScopeSpace(name: String, permissions: [String]): [String]
    addScope(scope: String): Void
    deleteRole(name: String): Void
    deleteScopeSpace(name: String): Void
    deleteScope(name: String): Void
    login(input: LoginInput): Void
    logout: Void
    signup(input: SignupInput): Void
  }
`

export default typeDefs
