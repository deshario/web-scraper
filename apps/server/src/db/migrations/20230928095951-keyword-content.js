'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KeywordContent', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      keywordId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      htmlContent: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    })

    await queryInterface.removeColumn('Keywords', 'htmlPreview')
    await queryInterface.addColumn('Keywords', 'contentId', {
      type: Sequelize.INTEGER,
      defaultValue: null,
      references: {
        model: 'KeywordContent',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Keywords', 'contentId')
    await queryInterface.addColumn('Keywords', 'htmlPreview', {
      type: Sequelize.TEXT,
      allowNull: true,
    })

    await queryInterface.dropTable('KeywordContent')
  },
}
