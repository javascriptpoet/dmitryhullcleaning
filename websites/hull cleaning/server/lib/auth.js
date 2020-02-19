import passport from "passport"
import { strategy } from "passport-local"

passport.use(
  new strategy.LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." })
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." })
      }
      return done(null, user)
    })
  })
)
