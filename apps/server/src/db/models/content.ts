import { Model, DataTypes, Sequelize } from 'sequelize'
import { TKeywordContent } from '../../interfaces'
import Keyword from './keyword'

class KeywordContent extends Model implements TKeywordContent {
  declare id: number
  declare keywordId: number
  declare htmlContent: string

  static initModel(sequelize: Sequelize): void {
    KeywordContent.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        keywordId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
        },
        htmlContent: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'KeywordContent',
        timestamps: false,
      },
    )
  }

  public static associateModel(): void {
    KeywordContent.belongsTo(Keyword, {
      foreignKey: 'keywordId',
    })
  }
}

export default KeywordContent
