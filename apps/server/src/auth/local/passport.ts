import passport from 'passport'
import { models } from '../../db/models'
import { TDoneCallback } from '../../interfaces'
import { Strategy as LocalStrategy } from 'passport-local'

const verifyUser = async (email: string, password: string, done: TDoneCallback) => {
  try {
    const user = await models.User.getUser({ email }, false)
    if (!user) return done(undefined, false, { message: 'E-mail not found!' })

    const isValid = models.User.verifyPassword(password, user.passwordHash)
    if (!isValid) return done(undefined, false, { message: 'Invalid Password' })

    const sanitizedUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    }

    return done(null, sanitizedUser)
  } catch (err) {
    return done(err, false)
  }
}

export const setupLocalStrategy = () => {
  passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, verifyUser))
}
