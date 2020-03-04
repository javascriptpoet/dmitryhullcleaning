import passport from "passport"
import { strategy } from "passport-local"
const JwtStrategy = require("passport-jwt")
import getToken from "../utils/getAuthToken"
import { ApolloError } from "apollo-server"
import modules from "../modules"

const usersController = modules.controllers.users()

passport.use(
  new strategy.LocalStrategy(async (username, password, done) => {
    try {
      const user = await usersController._findByUsername(username)
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
    const token = req && req.cookies ? req.cookies["jwt"] : getAuthToken("")
    return token
  },
  secretOrKey: process.env.JWT_SECRET
}

const guestUser = { roles: ["guest"] }
const jwtStrategy = new JwtStrategy(options, async ({ userId }, done) => {
  if (!userId) done(null, guestUser)
  try {
    const user = await usersController._findById(userId)
    const scopes = modules.controllers
      .permissions()
      ._resolvePermissions(user.allowed, user.disallowed)
    const currentUser = { ...user, scopes }
    return next(null, currentUser)
  } catch (e) {
    if (e instanceof ApolloError)
      return done(null, false, { message: e.message })
    return done(e)
  }
})
passport.use(jwtStrategy)
