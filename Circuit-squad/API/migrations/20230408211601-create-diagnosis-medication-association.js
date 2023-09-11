'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'medications',
      'diagnosisId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'diagnosis',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'medications',
      'diagnosisId'
    )
  }
};
