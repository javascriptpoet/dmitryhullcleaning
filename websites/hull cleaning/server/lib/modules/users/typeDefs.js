import gql from "graphql-tag"

const typeDefs = gql`
  interface UserProfile {
    fullName: String
    username: String
    email: String
    phone: String
    commMethod: CommMethod
    roles: [String]
    exceptionScopes: ExceptionScopes
    scopes: [String]
  }

  type UserProfile implements UserProfile {
    fullName: String
    username: String
    email: String
    phone: String
    commMethod: CommMethod
    roles: [String]
    exceptionScopes: ExceptionScopes
    scopes: [String]
  }

  type User implements UserProfile {
    id: ID
    ownerId: ID
    password: String
    createDate: String
    comments: [Comment]
    fullName: String
    username: String
    email: String
    phone: String
    commMethod: CommMethod
    roles: [String]
    allowedScopes: [String]
    disallowedScopes: [String]
    scopes: [String]
  }

  type CurrentUser implements UserProfile {
    createDate: String
    comments: [Comment]
    fullname: String
    username: String
    email: String
    phone: String
    commMethod: CommMethod
    roles: [String]
    allowedScopes: [String]
    disallowedScopes: [String]
    scopes: [String]
  }

  input AddUser {
    password: String
    fullName: String
    username: String
    email: String
    phone: String
    commMethod: String
    roles: [String]
    allowedScopes: [String]
    disallowedScopes: [String]
  }

  extend type Mutation {
    addUser(input: AddUser): User
    updateUser(id: ID, input: AddUser): User
    deleteUser(id: ID): ID
    addCommentToUser(id: ID, message: String): Comment
  }

  extend type Query {
    currentUser: CurrentUser
  }
`

export default typeDefs
