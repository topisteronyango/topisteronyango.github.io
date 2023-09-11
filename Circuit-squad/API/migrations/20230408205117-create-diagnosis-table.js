'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
      "diagnosis",
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            diagnosisType: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            result: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            glucoseLevel: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            healthCondition: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            bloodPressure: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            bloodCount: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            urineAnalysis: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            bloodGroup: {
                type: Sequelize.STRING(255),
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
    return queryInterface.dropTable('diagnosis');
  }
};
