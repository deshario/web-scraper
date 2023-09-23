import { Model, DataTypes, Sequelize } from 'sequelize'
import { TKeyword } from '../../interfaces'
import Users from './user'

class Keyword extends Model implements TKeyword {
  declare id: number
  declare keyword: string
  declare uploader: number
  declare totalLinks: number
  declare adWordsCount: number
  declare resultsCount: number
  declare executionTime: number
  declare htmlPreview: string
  declare isProcessed: boolean

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
        totalLinks: {
          type: DataTypes.NUMBER,
          allowNull: true,
        },
        adWordsCount: {
          type: DataTypes.NUMBER,
          allowNull: true,
        },
        resultsCount: {
          type: DataTypes.NUMBER,
          allowNull: true,
        },
        executionTime: {
          type: DataTypes.NUMBER,
          allowNull: true,
        },
        htmlPreview: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        isProcessed: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
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
