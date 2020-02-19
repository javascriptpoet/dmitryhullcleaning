import gql from "graphql-tag"

const typeDefs = gql`
   enum ComMethod {
      EMAIL
      VOICE
      TEXT
    }
    input AddContact {
      fullName: String
      comMethod: ComMethod
      email: String
      phone: String
      message: String
    }
    type Contact {
      id: ID
      fullName: String
      comMethod: ComMethod
      email: String
      phone: String
      message: String
      createDate: String
    }

    extend type Mutation {
      addContact(input: AddContact): Contact
      upsertContact(id: ID, updater: AddContact): Contact
      deleteContact(id:ID) ID
      addCommentToContact(id:ID,message:String):Comment
    }

    extend type Query {
      commentsOfContact(id:ID):[Comments]
    }
  `
const resolvers = {}

export default { typeDefs, resolvers }
