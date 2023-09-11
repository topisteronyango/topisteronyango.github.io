const { Sequelize, Model } = require('sequelize');

const sequelize = require('../config/db.config');
const Patient = require('./Patient.model');
const Doctor = require('./Doctor.model');
const Appointment = require('./Appointment.model');

class Diagnosis extends Model{};
Diagnosis.init(
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
        appointmentId: {
            type: Sequelize.INTEGER,
            references: {
                model: Appointment,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'diagnosis',
        freezeTableName: true
    }
);

Diagnosis.belongsTo(Patient);
Patient.hasMany(Diagnosis);
Diagnosis.belongsTo(Doctor);
Doctor.hasMany(Diagnosis);
Diagnosis.belongsTo(Appointment);
Appointment.hasMany(Diagnosis);

module.exports = Diagnosis;