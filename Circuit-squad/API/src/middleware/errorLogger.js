const logger = require('../config/winston.config')

const errorLogger = (err, req, res, next) =>{
    logger.error(`Internal server error: ${err.message}`);
    console.log(`Internal server error: ${err.message}`);
    res.status(500).json({message: `Internal server error: ${err.message}`});
    next()
}

module.exports = errorLogger;
