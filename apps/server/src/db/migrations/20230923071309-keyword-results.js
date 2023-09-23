'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Keywords', 'totalLinks', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.addColumn('Keywords', 'adWordsCount', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.addColumn('Keywords', 'resultsCount', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.addColumn('Keywords', 'executionTime', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.addColumn('Keywords', 'htmlPreview', {
        type: Sequelize.TEXT,
        allowNull: true,
      }),
      queryInterface.addColumn('Keywords', 'isProcessed', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      }),
    ])
  },

  async down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn('Keywords', 'totalLinks'),
      queryInterface.removeColumn('Keywords', 'adWordsCount'),
      queryInterface.removeColumn('Keywords', 'resultsCount'),
      queryInterface.removeColumn('Keywords', 'executionTime'),
      queryInterface.removeColumn('Keywords', 'htmlPreview'),
      queryInterface.removeColumn('Keywords', 'isProcessed'),
    ])
  },
}
