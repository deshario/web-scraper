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

    test('should return null for a invalid user', async () => {
      const findOneMock = jest.spyOn(User, 'findOne')
      findOneMock.mockRejectedValue(new Error('Database error'))
      const user = await User.getUser({ username: '' })
      expect(user).toBeNull()
    })
  })

  describe('signUp', () => {
    test('should returned a user after signup', async () => {
      const user = await User.signUp('robert', 'robert@twd.com', 'twd')
      expect(user).toBeDefined()
    })

    test('should return null for a invalid signup', async () => {
      const signUp = jest.spyOn(User, 'create')
      signUp.mockRejectedValue(new Error('Database error'))
      const user = await User.signUp('', '', '')
      expect(user).toBeNull()
    })
  })

  test('verifyPassword', () => {
    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync('twd', salt)
    const isValid = User.verifyPassword('twd', passwordHash)
    expect(isValid).toBe(true)
  })
})
