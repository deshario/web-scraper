import jwt from 'jsonwebtoken'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../index'
import env from '../../config/environment'

describe('JWT', () => {
  const payload = { id: 1, username: 'robert', email: 'robert@gmail.com' }

  describe('signAccessToken', () => {
    test('should sign an access token', () => {
      const accessToken = signAccessToken(payload)
      const decoded = jwt.verify(accessToken, env.secret.accessToken) as typeof payload
      expect(decoded.id).toBe(payload.id)
      expect(decoded.email).toBe(payload.email)
      expect(decoded.username).toBe(payload.username)
    })
  })

  describe('signRefreshToken', () => {
    test('should sign a refresh token', () => {
      const refreshToken = signRefreshToken(payload)
      const decoded = jwt.verify(refreshToken, env.secret.refreshToken) as typeof payload
      expect(decoded.id).toBe(payload.id)
    })
  })

  describe('verifyRefreshToken', () => {
    test('should verify if refreshToken is valid', () => {
      const refreshToken = signRefreshToken(payload)
      const decoded = verifyRefreshToken(refreshToken)
      const payloadKeys = Object.keys(payload)
      expect(payloadKeys.every((key) => decoded!.hasOwnProperty(key))).toBe(true)
    })

    test('should return null if refreshToken is invalid', () => {
      const invalidRefreshToken = ''
      const decoded = verifyRefreshToken(invalidRefreshToken)
      expect(decoded).toBeNull()
    })
  })
})
