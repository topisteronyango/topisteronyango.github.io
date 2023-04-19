'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
        'ministryOfHealth',
        {
          id: {
              type: Sequelize.INTEGER,
              allowNull: false,
              autoIncrement: true,
              primaryKey: true
          },
          name: {
              type: Sequelize.STRING(255),
              allowNull: false
          },
          email: {
              type: Sequelize.STRING(255),
              allowNull: false,
              unique: true
          },
          phoneNumber: {
              type: Sequelize.STRING(255),
              allowNull: false,
              unique: true
          },
          address: {
              type: Sequelize.STRING(255),
              allowNull: false
          },
          password: {
              type: Sequelize.STRING(255),
              allowNull: false
          },
          isMinistryOfHealth: {
              type: Sequelize.BOOLEAN,
              defaultValue: true,
              allowNull: false
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          }
        },
        {
          timestamps: true
        }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('ministryOfHealth');
  }
};
