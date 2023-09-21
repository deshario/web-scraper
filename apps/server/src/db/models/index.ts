import Connection from '../connection'
import User from './users'

const sequelize = Connection.getInstance()

User.initModel(sequelize)

User.associateModel()

export const db = sequelize

export const models = {
  User,
}
