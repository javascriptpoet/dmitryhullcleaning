import gql from "graphql-tag"

const UserProfileFields = `
  fullname: String
  username: String
  email: String
  phone: String
  commMethod: CommMethod
  allowed: [String]
  disallowed: [String]
  scopes:[String]
`
const typeDefs = gql`
  enum CommMethod {
    EMAIL
    VOICE
    TEXT
  }

  type UserProfile {
   ${UserProfileFields}
  }

  type User {
    id: ID
    ownerId: ID
    password: String
    createDate: String
    comments: [Comment]
    ${UserProfileFields}
  }

  type CurrentUser {
    createDate: String
    comments: [Comment]
    ${UserProfileFields}
  }

  input AddUser {
    password: String
    ${UserProfileFields}
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
