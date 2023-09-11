const { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcrypt');

const sequelize = require('../config/db.config');

class MinistryOfHealth extends Model{};
MinistryOfHealth.init(
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
        }
    }, 
    {
        sequelize,
        modelName: 'ministryOfHealth',
        hooks: {
            beforeCreate: async(ministryOfHealth)=>{
                const salt = await bcrypt.genSalt();
                ministryOfHealth.password = await bcrypt.hash(ministryOfHealth.password, salt);
            }
        },
        freezeTableName: true
    }
)

module.exports = MinistryOfHealth;



