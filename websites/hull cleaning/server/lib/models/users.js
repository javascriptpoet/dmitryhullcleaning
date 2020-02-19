import gql from "graphql-tag"
import Collection from "../utils/Collection"

const typeDefs = gql`
  enum UserRole {
    CLIENT
    ADMIN
  }
  type UserProfile {
    fullName: String
    username: String
    email: String
    phone: String
    comMethod: ComMethod
    role: UserRole
  }

  type User {
    id: ID
    profile: UserProfile
    password: String
    createDate: String
    comments: [Comment]
  }
  input AddUser {
    profile: UserProfile
    password: String
  }

  extend type Mutation {
    addUser(input: AddUser): User
    updateUser(id: ID, updater: AddUser): User
    deleteUser(id: ID): ID
    addCommentToUser(id: ID, message: String): Comment
  }
`
const resolvers = {}

class UsersCollection extends Collection {}
const collection = new CommentsCollection({ name: "Users" })
export default { typeDefs, resolvers, collection }
