const { Sequelize, Model } = require("sequelize");

const sequelize = require("../config/db.config");
const Service = require("./Service.model");
const Medication = require("./Medication.model");

class Payment extends Model{};
Payment.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        paymentMethod: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        serviceId: {
            type: Sequelize.INTEGER,
            references: {
                model: Service,
                key: 'id'
            }
        },
        medicationId: {
            type: Sequelize.INTEGER,
            references: {
                model: Medication,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'payment',
        freezeTableName: true
    }
)

Payment.belongsTo(Service);
Service.hasOne(Payment);
Payment.belongsTo(Medication);
Medication.hasMany(Payment);

module.exports = Payment;