const RequestValidationMiddleware = require('../common/middlewares/request.validation.middleware');
const UserValidationMiddleware = require('./middlewares/user.validation.middleware');
const AuthMiddleware = require('../common/middlewares/auth.middleware');
const PermissionMiddleware = require('../common/middlewares/permission.middleware');
const UserController = require('./controllers/user.controller');
const config = require('../common/config/app.config');



exports.routesConfig = function (app) {
    app.post('/user', [
        RequestValidationMiddleware.validateRequestBody(['Email', 'Password', 'permissionLevel']),
        UserValidationMiddleware.isUserAlreadyRegisterd,
        UserController.insert
    ]);
    app.get('/users', [
        AuthMiddleware.authenticateUser,
        PermissionMiddleware.minimumPermissionLevelRequired(config.permissionLevel.USER),
        UserController.list
    ]);
    app.get('/user/:userId', [
        AuthMiddleware.authenticateUser,
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UserController.getById
    ]);
    app.patch('/user/:userId', [
        AuthMiddleware.authenticateUser,
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UserController.patchById
    ]);
    app.delete('/user/:userId', [
        AuthMiddleware.authenticateUser,
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UserController.removeById
    ]);
};