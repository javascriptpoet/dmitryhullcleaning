import gql from "graphql-tag"

const typeDefs = gql`

  extend type Query {
    resolvePermissions(allowedPermissions:[String],disallowedPermissions:[String]):[Strings]
  }

  extend type Mutation {
    upsertRole(name:String,permissions:[String]):[String]
    upsertScopeSpace((name:String,permissions:[String]):[String]
    addScope(scope:string):void
    deleteRole(name:String):void
    deleteScopeSpace(name:String):void
    deleteScope(name:String):void
  }
`

export default [typeDefs]
