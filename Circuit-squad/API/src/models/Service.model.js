const { Sequelize, Model } = require("sequelize");
const sequelize = require("../config/db.config");
const Patient = require("./Patient.model");
const Doctor = require("./Doctor.model");
const Appointment = require("./Appointment.model");

class Service extends Model{};
Service.init(
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
        amount: {
            type: Sequelize.STRING(255),
            allowNull: false
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
        modelName: 'services'
    }
)

Patient.hasMany(Service);
Service.belongsTo(Patient);
Doctor.hasMany(Service);
Service.belongsTo(Doctor);
Service.belongsTo(Appointment);
Appointment.hasMany(Service);

module.exports = Service