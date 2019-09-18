const config = require('../common/config/app.config');
const EntryController = require('./controllers/entry.controller');
const AuthMiddleware = require('../common/middlewares/auth.middleware');
const PermissionMiddleware = require('../common/middlewares/permission.middleware');
const RequestValidationMiddleware = require('../common/middlewares/request.validation.middleware');

exports.routesConfig = function (app) {
    app.post('/entry', [
        AuthMiddleware.authenticateUser,
        RequestValidationMiddleware.validateRequestBody(['userId', 'projectId', 'entryState']),
        EntryController.insert
    ]);
    app.get('/entries', [
        AuthMiddleware.authenticateUser,
        PermissionMiddleware.minimumPermissionLevelRequired(config.permissionLevel.USER),
        EntryController.list
    ]);
    app.get('/entry/:entryId', [
        AuthMiddleware.authenticateUser,
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        EntryController.getById
    ]);
    app.patch('/entry/:entryId', [
        AuthMiddleware.authenticateUser,
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        EntryController.patchById
    ]);
    app.delete('/entry/:entryId', [
        AuthMiddleware.authenticateUser,
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        EntryController.removeById
    ]);
};