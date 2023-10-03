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

    test('should throw an error if refreshToken is invalid', () => {
      const verify = jest.spyOn(jwt, 'verify')
      verify.mockImplementation(() => {
        throw new Error('jwt must be provided')
      })

      const refreshToken = ''
      expect(() => verifyRefreshToken(refreshToken)).toThrowError('jwt must be provided')
      expect(verify).toHaveBeenCalledWith(refreshToken, env.secret.refreshToken)
    })
  })
})
