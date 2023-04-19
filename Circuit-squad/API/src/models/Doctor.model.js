const bcrypt = require('bcrypt');
const { Sequelize, Model } = require('sequelize')

const sequelize = require('../config/db.config');
const MinistryOfHealth = require('./MinistryOfHealth.model');
const Hospital = require('./Hospital.model');


class Doctor extends Model{}
Doctor.init({
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING(255),
        allowNull: false,
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
    licenseNumber: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    specialization: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    isDoctor: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    hospitalId: {
        type: Sequelize.INTEGER,
        references: {
            model: Hospital,
            key: 'id'
        }
    }
}, 
{
    sequelize,
    modelName: 'doctors',
    hooks: {
        beforeCreate: async(user)=>{
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
});
    
Hospital.hasMany(Doctor);
Doctor.belongsTo(Hospital);

module.exports = Doctor;

 