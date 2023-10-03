import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import { TExpressAuthUser, TExpressAuthInfo } from '../interfaces'
import { verifyRefreshToken } from '../services'
import { getErrorMsg } from '../utils'

export const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (error: unknown, user?: TExpressAuthUser, info?: TExpressAuthInfo) => {
      if (error || !user) {
        const errorMessage = error ? getErrorMsg(error) : info?.message
        return res.status(401).json({ success: false, error: errorMessage })
      }
      req.user = user
      return next()
    },
  )(req, res, next)
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    (error: unknown, user?: TExpressAuthUser, info?: TExpressAuthInfo) => {
      if (error || !user) {
        const errorMessage = error ? getErrorMsg(error) : info?.message
        return res.status(401).json({ success: false, error: errorMessage })
      }
      req.user = user
      return next()
    },
  )(req, res, next)
}

export const validateRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  const payload = verifyRefreshToken(req.body.refreshToken)
  if (payload) {
    req.user = { id: payload.id, username: payload.username, email: payload.email }
    return next()
  } else {
    return res.status(401).json({ success: false, error: 'Invalid refresh token' })
  }
}
