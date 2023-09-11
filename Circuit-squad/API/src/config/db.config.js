const {Sequelize} = require('sequelize');

const logger = require('./winston.config');

const sequelize = new Sequelize(
    process.env.DATABASE_NAME, 
    process.env.DATABASE_USERNAME, 
    process.env.DATABASE_PASSWORD, 
    { 
        host: process.env.DATABASE_HOST,
        dialect: "mysql"
    });



sequelize.authenticate()
.then(()=>{
    logger.info('Successfully connected to the database server');
    console.log('Successfully connected to the database server');
})
.catch((e)=>{
    throw e;
})    

module.exports = sequelize;