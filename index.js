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
const UserRoutes = require('./mains/users/routes.config');
const EntryRoutes = require('./mains/entries/routes.config');


app.use(cors(corsConfigOptions));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));



UserRoutes.routesConfig(app);
EntryRoutes.routesConfig(app);

app.use(function(err, req, res, next) {
    let payload = {
        message: err.message,
        details: err.details,
        status: err.status
    }
    res.status(err.statusCode || 500).send(payload);
});

if (config.environment === 'prod') {

}


app.listen(config.port, function() {
    console.log('app listening at port %s', config.port);
});