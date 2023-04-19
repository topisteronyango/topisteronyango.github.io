'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'patients',
      'insuranceCompanyId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'insuranceCompany',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'patients',
      'insuranceCompanyId'
    )
  }
};
