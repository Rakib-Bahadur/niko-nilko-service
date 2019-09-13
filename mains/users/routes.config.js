const RequestValidationMiddleware = require('../common/middlewares/request.validation.middleware');
const UserValidationMiddleware = require('./middlewares/user.validation.middleware');
const UserController = require('./controllers/user.controller');
exports.routesConfig = function (app) {
    app.post('/users', [
        RequestValidationMiddleware.validateRequestBody(['Email', 'Password', 'permissionLevel']),
        UserValidationMiddleware.isUserAlreadyRegisterd,
        UserController.insert
    ]);
    app.get('/users', [
        
    ]);
    app.get('/users/:userId', [
        
    ]);
    app.patch('/users/:userId', [
        
    ]);
    app.delete('/users/:userId', [
        
    ]);
};