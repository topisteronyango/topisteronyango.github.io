const { Sequelize, Model } = require('sequelize');

const sequelize = require('../config/db.config');
const Diagnosis = require('./Diagnosis.model');

class Medication extends Model{};
Medication.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        prescription: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        diagnosisId: {
            type: Sequelize.INTEGER,
            references: {
                model: Diagnosis,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'medications'
    }
);

Diagnosis.hasMany(Medication);
Medication.belongsTo(Diagnosis);

module.exports = Medication;