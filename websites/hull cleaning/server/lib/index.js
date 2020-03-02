const { ApolloServer } = require("apollo-server")
import { reduce } from "ramda"
import gql from "graphql-tag"
import { TIMEOUT, resolveSoa } from "dns"
import usersController from "./modules/users/controller"
const express = require("express")
import passport from "passport"
import { strategy } from "passport-local"
const JwtStrategy = require("passport-jwt")
import jwt from "jsonwebtoken"
import authRouter from "./authRouter"
import getToken from "./getToken"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import Ramda from "ramda"
import { ApolloError } from "apollo-server"
import permissionsController from "./modules/permissions/controller"
import flash from "connect-flash"

const controllers = {
  usersController,
  permissionsController
}

passport.use(
  new strategy.LocalStrategy(async (username, password, done) => {
    try {
      const user = await usersController()._findByUsername(username)
      if (user.password !== password)
        return done(null, false, { message: `wrong password` })
      return done(user)
    } catch (e) {
      if (e instanceof ApolloError)
        return done(null, false, { message: e.message })
      return done(e)
    }
  })
)

const options = {
  jwtFromRequest: function(req) {
    const token = req && req.cookies ? req.cookies["jwt"] : getToken("")
    return token
  },
  secretOrKey: process.env.JWT_SECRET
}

const guestUser = { roles: ["guest"] }
const jwtStrategy = new JwtStrategy(options, async ({ userId }, done) => {
  if (!userId) done(null, guestUser)
  try {
    const user = await usersController()._findById(userId)
    return next(null, user)
  } catch (e) {
    if (e instanceof ApolloError)
      return done(null, false, { message: e.message })
    return done(e)
  }
})
passport.use(jwtStrategy)

const app = express()

app.use(cookieParser())
app.use(bodyParser())
app.use(express.session({ cookie: { maxAge: 60000 } }))
app.use(flash())
app.use(passport.initialize())
app.use("/api", authRouter(passport))
app.post("/graphql", passport.authenticate(["jwt"], { session: false }))

new ApolloServer({
  typeDefs,
  resolvers,
  graphiql: true,
  pretty: true,
  context: (req, res) => {
    return {
      user: req.user,
      controllers: Ramda.map(controller =>
        controller({ currentUser: req.user })
      )
    }
  }
})
server.applyMiddleware({ app, path: "/graphql" })
server
  .listen()
  .then(({ url }) => console.log(`Running a GraphQL API server at ${url}`))
