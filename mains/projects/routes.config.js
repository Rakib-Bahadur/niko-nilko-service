const config = require('../common/config/app.config');
const ProjectController = require('./controllers/project.controller');
const ProjectMiddleware = require('./middlewares/project.middleware');
const AuthMiddleware = require('../common/middlewares/auth.middleware');
const PermissionMiddleware = require('../common/middlewares/permission.middleware');
const RequestValidationMiddleware = require('../common/middlewares/request.validation.middleware');

exports.routesConfig = function (app) {
    app.post('/project', [
        AuthMiddleware.authenticateUser,
        RequestValidationMiddleware.validateRequestBody(['name'], ['description', 'members']),
        ProjectController.insert
    ]);
    app.get('/projects', [
        AuthMiddleware.authenticateUser,
        PermissionMiddleware.minimumPermissionLevelRequired(config.permissionLevel.USER),
        ProjectController.list
    ]);
    app.get('/project/:projectId', [
        AuthMiddleware.authenticateUser,
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        ProjectController.getById
    ]);
    app.patch('/project/:projectId', [
        AuthMiddleware.authenticateUser,
        ProjectMiddleware.onlyCreatorCanDoThis,
        ProjectController.patchById
    ]);
    app.delete('/project/:projectId', [
        AuthMiddleware.authenticateUser,
        ProjectMiddleware.onlyCreatorCanDoThis,
        ProjectController.removeById
    ]);
};