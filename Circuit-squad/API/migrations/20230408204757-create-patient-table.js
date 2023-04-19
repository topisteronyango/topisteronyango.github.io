'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'patients',
      {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        lastName: {
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
        dateOfBirth: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false,

        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        healthCondtion: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        insuranceMembershipNumber: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        isPatient: {
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
    return queryInterface.dropTable('patients');
  }
};
