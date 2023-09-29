import { Request, Response, NextFunction } from 'express'
import { validateRefreshToken } from '../auth'

const setupMock = () => {
  const mockRequest = { body: { refreshToken: '' } } as Request
  const mockResponse = () => {
    const res = {} as Response
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }
  const mockNext: NextFunction = jest.fn()

  return {
    req: mockRequest,
    res: mockResponse(),
    next: mockNext,
  }
}

jest.mock('../../services')

describe('validateRefreshToken', () => {
  let verifyRefreshTokenMock: jest.Mock

  beforeAll(() => {
    verifyRefreshTokenMock = jest.requireMock('../../services').verifyRefreshToken
  })

  test('Should verify token and attach user to request', () => {
    const { req, res, next } = setupMock()
    const jwtPayload = {
      id: 1,
      username: 'daryl',
      email: 'daryl@twd.com',
    }

    verifyRefreshTokenMock.mockReturnValue(jwtPayload)
    validateRefreshToken(req, res, next)

    expect(req.user).toEqual(jwtPayload)
    expect(next).toHaveBeenCalled()
    expect(verifyRefreshTokenMock).toHaveBeenCalledWith(req.body.refreshToken)
  })

  test('Should return 401 for an invalid refresh token', () => {
    const { req, res, next } = setupMock()

    verifyRefreshTokenMock.mockReturnValue(null)
    validateRefreshToken(req, res, next)

    expect(req.user).toBeUndefined()
    expect(next).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(401)
    expect(verifyRefreshTokenMock).toHaveBeenCalledWith(req.body.refreshToken)
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Invalid refresh token' })
  })
})
