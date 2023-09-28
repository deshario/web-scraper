import { Model, DataTypes, Sequelize } from 'sequelize'
import { TKeyword } from '../../interfaces'
import Users from './user'
import KeywordContent from './content'

class Keyword extends Model implements TKeyword {
  declare id: number
  declare keyword: string
  declare uploader: number
  declare totalLinks: number
  declare adWordsCount: number
  declare resultsCount: string
  declare executionTime: number
  declare contentId: number
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
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        totalLinks: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        adWordsCount: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        resultsCount: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        executionTime: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
        },
        contentId: {
          type: DataTypes.INTEGER,
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

    Keyword.hasOne(KeywordContent, {
      foreignKey: 'keywordId',
      as: 'content',
    })
  }
}

export default Keyword
