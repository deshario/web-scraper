import { Sequelize } from 'sequelize'
import Connection from '../connection'

describe('Connection', () => {
  let sequelize: Sequelize
  let consoleLog: jest.SpyInstance

  beforeAll(() => {
    sequelize = Connection.getInstance()
    consoleLog = jest.spyOn(console, 'log')
  })

  test('should connect to the database', async () => {
    sequelize.authenticate = jest.fn(() => Promise.resolve())

    const connection = await Connection.connect()

    expect(connection).toEqual(sequelize)
    expect(sequelize.authenticate).toHaveBeenCalled()
    expect(consoleLog).toHaveBeenCalledWith('Database connection authenticated successfully')
  })

  test('should handle connection error', async () => {
    sequelize.authenticate = jest.fn(() => Promise.reject(new Error('Authentication Error')))

    const connection = await Connection.connect()

    expect(connection).toEqual(sequelize)
    expect(sequelize.authenticate).toHaveBeenCalled()
    expect(consoleLog).toHaveBeenCalledWith('Error while creation connection to database')
  })

  test('should close the database connection', async () => {
    sequelize.close = jest.fn(() => Promise.resolve())

    const connection = await Connection.close()

    expect(connection).toEqual(sequelize)
    expect(sequelize.close).toHaveBeenCalled()
    expect(consoleLog).toHaveBeenCalledWith('Database connection closed successfully')
  })

  test('should handle database connection closing error', async () => {
    sequelize.close = jest.fn(() => Promise.reject(new Error('Closing Error')))

    const connection = await Connection.close()

    expect(connection).toEqual(sequelize)
    expect(sequelize.close).toHaveBeenCalled()
    expect(consoleLog).toHaveBeenCalledWith('Error while closing database connection')
  })
})
