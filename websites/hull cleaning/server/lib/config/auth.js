import passport from "passport"
import LocalStrategy from "passport-local"
const JwtStrategy = require("passport-jwt").Strategy
import { ApolloError } from "apollo-server"
import modules from "../modules"
import config from "getconfig"
import getAuthToken from "../utils/getAuthToken"
import getController from "../utils/getController"

const usersController = getController({
  name: "users",
  controllers: modules.controllers
})
const guestUserId = "guestId"
const guestUser = {
  id: guestUserId,
  allowed: ["guest"],
  scopes: ["users.currentUser", "permissions.login", "permissions.signup"]
}
const guestUserToken = getAuthToken(guestUserId)

const options = {
  jwtFromRequest: function(req) {
    const token = req && req.cookies ? req.cookies["jwt"] : guestUserToken
    console.log("jwtFromRequest", token)
    return token
  },
  secretOrKey: config.server.jwtSecret
}

passport.use(
  "jwt",
  new JwtStrategy(options, (userId, done) => {
    console.log("jwt strategy", userId)
    if (userId === guestUserId) done(null, guestUser)
    else
      usersController
        ._findById(userId)
        .then(user => done(null, user))
        .catch(done)
  })
)
