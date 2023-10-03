import bcrypt from 'bcrypt'
import User from '../models/user'
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('sqlite::memory:', {
  dialect: 'sqlite',
  logging: false,
})

User.initModel(sequelize)

describe('User', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  describe('getUser', () => {
    test('should return a valid user', async () => {
      const newUser = {
        username: 'daryl',
        email: 'daryl@twd.com',
        passwordHash: 'twd',
      }
      await User.create(newUser)

      const user = await User.getUser(
        {
          username: newUser.username,
        },
        false,
      )

      expect(user).toBeDefined()
      expect(user!.username).toEqual(newUser.username)
      expect(user!.email).toEqual(newUser.email)
    })

    test('should throw an error for a invalid user', async () => {
      const errorMessage = 'Get user error'
      const findOneMock = jest.spyOn(User, 'findOne')
      findOneMock.mockRejectedValue(new Error(errorMessage))
      await expect(User.getUser({})).rejects.toThrowError(errorMessage)
    })
  })

  describe('signUp', () => {
    test('should returned a user after signup', async () => {
      const user = await User.signUp('robert', 'robert@twd.com', 'twd')
      expect(user).toBeDefined()
    })

    test('should throw an error for a invalid signup', async () => {
      const errorMessage = 'Signup error'
      const signUpMock = jest.spyOn(User, 'create')
      signUpMock.mockRejectedValue(new Error(errorMessage))
      await expect(User.signUp('', '', '')).rejects.toThrowError(errorMessage)
    })
  })

  test('verifyPassword', () => {
    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync('twd', salt)
    const isValid = User.verifyPassword('twd', passwordHash)
    expect(isValid).toBe(true)
  })
})
