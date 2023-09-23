'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Keywords', 'resultsCount', {
        type: Sequelize.STRING,
      }),
      queryInterface.changeColumn('Keywords', 'executionTime', {
        type: Sequelize.DECIMAL(10, 2),
      }),
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Keywords', 'resultsCount', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn('Keywords', 'executionTime', {
        type: Sequelize.INTEGER,
      }),
    ])
  },
}
