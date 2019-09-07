const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');


const config = require('./mains/common/config/app.config');
const corsConfigOptions = require('./mains/common/config/cors.config');
require('events').EventEmitter.defaultMaxListeners = Infinity;

//Routers


app.use(cors(corsConfigOptions));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));

if (config.environment === 'prod') {

}


app.listen(config.port, function() {
    console.log('app listening at port %s', config.port);
});