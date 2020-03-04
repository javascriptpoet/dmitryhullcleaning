const router = require("express").Router()
import getAuthToken from "./utils/getAuthToken"
import usersController from "./modules/users/controller"
import { ApolloError } from "apollo-server"

const domain =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000"

const url = path => `${domain}${path}`

const authRouter = passport => {
  const login = (req, res, next) => {
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(err)
      }
      if (!user) {
        req.flash("failed", info)
        return res.redirect(url("/login"))
      }
      req.flash("success", `logged in as ${user.username}`)
      res.cookie("jwt", `${getAuthToken(req.user.id)}`, {
        maxAge: 24 * 60 * 60,
        httpOnly: true
      })
      res.redirect(url("/"))
      next()
    })(req, res, next)
  }

  const logout = (req, res, next) => {
    passport.authenticate("jwt", (err, user, info) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        req.flash("failed", info)
        return
      }
      res.cookie("jwt", "", {
        maxAge: Date(0)
      })
      req.flash("success", "logged out")
      res.redirect(url("/"))
      next()
    })(req, res, next)
  }

  const signup = async (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash("failed", "Please provide a username and a password.")
      return res.status(401).redirect(url("/signup"))
    } else {
      const user = await usersController()._add({ username, password })
      res.status(201)
      req.flash("success", "account created, dont forget to complete profile")
      next()
    }
  }

  router.post("/login", login)
  router.post("/logout", logout)
  router.post("/signup", signup)
  return router
}

export default authRouter
