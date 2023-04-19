const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const winston = require('winston');
const swaggerUI = require('swagger-ui-express');
require('dotenv').config();

const routes = require('./routes/routes');
const logger = require('./config/winston.config');
const errorLogger = require('./middleware/errorLogger');
const swaggerDoc = require('./config/swager.json');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
require('./config/db.config');


app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

winston.exceptions.handle(new winston.transports.File({filename: 'Exceptions.log'}));
process.on('unhandledRejection', (ex)=>{
    throw ex;
});

app.use('/api', routes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(errorLogger);


const server = app.listen(port, ()=>{
    logger.info(`Circuit squad api server service intiated`);
    console.log(`Circuit squad api server service intiated`)
});

module.exports = server;