'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'hospitals',
      'ministryOfHealthId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'ministryOfHealth',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'hospitals',
      'ministryOfHealthId'
    )
  }
};
