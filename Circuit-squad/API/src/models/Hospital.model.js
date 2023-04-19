const { Sequelize, Model } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = require('../config/db.config');
const MinistryOfHealth = require('./MinistryOfHealth.model');


class Hospital extends Model{};
Hospital.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isHospital: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        ministryOfHealthId: {
            type: Sequelize.INTEGER,
            references: {
                model: MinistryOfHealth,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'hospitals',
        hooks: {
            beforeCreate: async (hospital)=>{
                const salt = await bcrypt.genSalt();
                hospital.password = await bcrypt.hash(hospital.password, salt);
            }
        }
    }
)

MinistryOfHealth.hasMany(Hospital);
Hospital.belongsTo(MinistryOfHealth);

module.exports = Hospital;