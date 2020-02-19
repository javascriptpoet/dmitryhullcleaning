import gql from "graphql-tag"

const typeDefs = gql`
  input AddComment {
    toCommentId: ID
    message: String
  }
  type Comment {
    id: ID
    ownerId: ID
    dateCreated: String
    message: String
  }

  extend type Mutation {
    addComment(input: AddComment): Comment
    updateComment(id: ID, updater: AddComment): Comment
    deleteComment(id: ID): ID
  }

  extend type Query {
    commentsOfComment(id: ID): [Comments]
  }
`
const resolvers = {}

export default { typeDefs, resolvers }
