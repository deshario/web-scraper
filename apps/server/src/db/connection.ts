import { Sequelize } from 'sequelize'
import env from '../config/environment'

class Connection {
  private static instance: Sequelize

  public static getInstance(): Sequelize {
    if (!Connection.instance) {
      Connection.instance = new Sequelize({
        host: env.db.host,
        username: env.db.username,
        password: env.db.password,
        database: env.db.database,
        dialect: 'postgres',
        dialectOptions: {
          charset: 'utf8',
        },
        logging: false,
      })
    }

    return Connection.instance
  }

  static async connect(): Promise<Sequelize> {
    const sequelize = Connection.getInstance()
    try {
      await sequelize.authenticate()
      console.log('Database connection authenticated successfully')
      return sequelize
    } catch (ex) {
      console.log('Error while creation connection to database')
      return sequelize
    }
  }

  static async close(): Promise<Sequelize> {
    const sequelize = Connection.getInstance()
    try {
      await sequelize.close()
      console.log('Database connection closed successfully')
      return sequelize
    } catch (ex) {
      console.log('Error while closing database connection')
      return sequelize
    }
  }
}

export default Connection
