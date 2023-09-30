import bcrypt from 'bcrypt'
import { Model, DataTypes, Sequelize, Op, HasManyGetAssociationsMixin } from 'sequelize'
import { TUser, TUserFilter } from '../../interfaces'
import Keyword from './keyword'

class User extends Model implements TUser {
  declare id: number
  declare username: string
  declare email: string
  declare passwordHash: string

  declare getKeywords: HasManyGetAssociationsMixin<Keyword>

  static initModel(sequelize: Sequelize): void {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        passwordHash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'Users',
        timestamps: false,
      },
    )
  }

  public static associateModel(): void {
    User.hasMany(Keyword, {
      foreignKey: 'uploader',
      as: 'keywords',
    })
  }

  static async getUser(where: TUserFilter, excludePassword = true): Promise<User | null> {
    try {
      const fieldsToExclude = excludePassword ? ['passwordHash'] : []
      const user = await User.findOne({
        raw: true,
        attributes: {
          exclude: fieldsToExclude,
        },
        where: {
          [Op.or]: where,
        },
      })
      return user
    } catch (error) {
      throw error
    }
  }

  static async signUp(username: string, email: string, password: string): Promise<User> {
    try {
      const salt = bcrypt.genSaltSync()
      const passwordHash = bcrypt.hashSync(password, salt)

      const newUser = await User.create({
        username,
        email,
        passwordHash,
      })
      return newUser
    } catch (error) {
      throw error
    }
  }

  static verifyPassword(password: string, hash: string): boolean {
    const isValid = bcrypt.compareSync(password, hash)
    return isValid
  }
}

export default User
