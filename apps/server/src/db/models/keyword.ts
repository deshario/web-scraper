import { Model, DataTypes, Sequelize } from 'sequelize'
import { TKeyword } from '../../interfaces'
import Users from './user'

class Keyword extends Model implements TKeyword {
  declare id: number
  declare keyword: string
  declare uploader: number

  static initModel(sequelize: Sequelize): void {
    Keyword.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        keyword: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        uploader: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'Keywords',
        timestamps: false,
      },
    )
  }

  public static associateModel(): void {
    Keyword.belongsTo(Users, {
      foreignKey: 'uploader',
      as: 'users',
    })
  }
}

export default Keyword
