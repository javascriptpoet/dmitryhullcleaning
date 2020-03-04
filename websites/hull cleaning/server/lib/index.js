const { ApolloServer } = require("apollo-server")
import gql from "graphql-tag"
import { TIMEOUT, resolveSoa } from "dns"
const express = require("express")
import authRouter from "../authRouter"

import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import R from "ramda"
import flash from "connect-flash"
import modules from "./modules"
import config from "./config"

const main = async () => {
  await config()

  const controllers = R.map(
    controller => controller({ currentUser: req.user }),
    modules.controllers
  )

  const app = express()

  app.use(cookieParser())
  app.use(bodyParser())
  app.use(express.session({ cookie: { maxAge: 60000 } }))
  app.use(flash())
  app.use(passport.initialize())
  app.use("/api", authRouter(passport))
  app.post("/graphql", passport.authenticate(["jwt"], { session: false }))

  new ApolloServer({
    ...R.pick(["typeDefs", "resolvers"], modules),
    graphiql: true,
    pretty: true,
    context: (req, res) => {
      return {
        user: req.user,
        controllers
      }
    }
  })
  server.applyMiddleware({ app, path: "/graphql" })
  server
    .listen()
    .then(({ url }) => console.log(`Running a GraphQL API server at ${url}`))
}

main()
