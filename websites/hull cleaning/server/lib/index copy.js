const { ApolloServer } = require("apollo-server")
import { reduce } from "ramda"
//import schema from './schema'
import gql from "graphql-tag"
import { TIMEOUT } from "dns"
import auth from "./models/auth"
const express = require("express")

const seedSchema = gql`
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

const resolvers = {
  Mutation: {},
  Query: {}
}

const app = express()

new ApolloServer({
  typeDefs,
  resolvers,
  graphiql: true,
  pretty: true
}).server
  .listen()
  .then(({ url }) => console.log(`Running a GraphQL API server at ${url}`))
