const { ApolloServer, AuthenticationError } = require("apollo-server-express")

const { makeExecutableSchema } = require("graphql-tools")
const express = require("express")
import passport from "passport"
import R from "ramda"
import modules from "./modules"
import config from "./config"
import appTypeDefs from "./typeDefs"
import getController from "./utils/getController"
import cors from "cors"

const main = async () => {
  await config()
  const { typeDefs: moduleTypeDefs, resolvers } = modules
  const typeDefs = [appTypeDefs, ...moduleTypeDefs]

  const context = ({ req, res }) => {
    const getCurrentUser = () => {
      return !req.currentUser
        ? new Promise((resolve, reject) => {
            passport.authenticate("jwt", (err, user) => {
              if (err) reject(err)
              if (!user)
                reject(new AuthenticationError("user authentication failed"))
              resolve(user)
            })(req)
          })
            .then(user => {
              req.currentUser = user
              console.log("getCurrentUser", user)
              return user
            })
            .catch(e => {
              throw e
            })
        : req.currentUser
    }

    return {
      req,
      res,
      getCurrentUser,
      getController: name =>
        getController({
          name,
          getCurrentUser,
          controllers: modules.controllers
        })
    }
  }

  const customErrorHandler = (err, req, res, next) => {
    if (res.headersSent) {
      return next(err)
    }
    res.json({
      message: err.message
    })
    next()
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    graphiql: true,
    pretty: true,
    context,
    formatError: e => console.log(e)
  })

  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(passport.initialize())

  app.use(express.static(path.join(__dirname, "build")))
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"))
  })
  server.applyMiddleware({ app })

  app.use(customErrorHandler)
  app.listen(4000, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
  return 0
}

main().catch(e => {
  console.log(e)
})
