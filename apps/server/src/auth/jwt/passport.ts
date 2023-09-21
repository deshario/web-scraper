import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { TJwtPayload, TDoneCallback } from '../../interfaces'
import { models } from '../../db/models'
import env from '../../config/environment'

const verifyPayload = async (payload: TJwtPayload, done: TDoneCallback) => {
  try {
    const user = await models.User.getUser({ id: payload.id })
    if (!user) return done(undefined, false, { message: 'E-mail not found!' })
    return done(null, user)
  } catch (err) {
    return done(err, false)
  }
}

export const setupJWTStrategy = () => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.secret.accessToken,
  }
  passport.use(new JwtStrategy(jwtOptions, verifyPayload))
}
