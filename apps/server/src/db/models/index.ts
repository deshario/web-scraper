import Connection from '../connection'
import User from './user'
import Keyword from './keyword'

const sequelize = Connection.getInstance()

User.initModel(sequelize)
Keyword.initModel(sequelize)

User.associateModel()
Keyword.associateModel()

export const db = sequelize

export const models = {
  User,
  Keyword,
}
