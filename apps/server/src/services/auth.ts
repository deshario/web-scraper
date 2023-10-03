import jwt from 'jsonwebtoken'
import env from '../config/environment'
import { TJwtSignPayload } from '../interfaces'

export const signAccessToken = (payload: TJwtSignPayload) => {
  return jwt.sign(payload, env.secret.accessToken, { expiresIn: '2h' })
}

export const signRefreshToken = (payload: TJwtSignPayload) => {
  return jwt.sign(payload, env.secret.refreshToken, { expiresIn: '2d' })
}

export const verifyRefreshToken = (refreshToken: string) => {
  try {
    return jwt.verify(refreshToken, env.secret.refreshToken) as TJwtSignPayload
  } catch (error) {
    throw error
  }
}
