const { Sequelize, Model } = require('sequelize');

const sequelize = require('../config/db.config');
const Patient = require('./Patient.model');
const Doctor = require('./Doctor.model');


class Appointment extends Model{};

Appointment.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    notes: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    patientId: {
        type: Sequelize.INTEGER,
        references: {
            model: Patient,
            key: 'id'
        }
    },
    doctorId: {
        type: Sequelize.INTEGER,
        references: {
            model: Doctor,
            key: 'id'
        }
    }
}, 
{
    sequelize,
    modelName: 'appointments'
})

Appointment.belongsTo(Patient);
Appointment.belongsTo(Doctor);
Doctor.hasMany(Appointment);
Patient.hasMany(Appointment);

module.exports = Appointment;