import Connection from '../connection'
import User from './user'
import Keyword from './keyword'
import KeywordContent from './content'

const sequelize = Connection.getInstance()

User.initModel(sequelize)
Keyword.initModel(sequelize)
KeywordContent.initModel(sequelize)

User.associateModel()
Keyword.associateModel()
KeywordContent.associateModel()

export const db = sequelize

export const models = {
  User,
  Keyword,
  KeywordContent,
}
