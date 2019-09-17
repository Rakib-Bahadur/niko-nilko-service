const config = require('../config/app.config');
const ForbiddenError = require('../models/error.forbidden.model');
const ErrorMessage = require('../config/error.message.config');


exports.minimumPermissionLevelRequired = (required_permission_level) => {
    return (req, res, next) => {
        let user_permission_level = parseInt(req.userInfo.permissionLevel);
        if (required_permission_level <= user_permission_level) {
            return next();
        } else {
            next(new ForbiddenError(ErrorMessage.UserForbidden, ErrorMessage.DoNotHavePermission));
        }
    };
};

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
    let user_permission_level = parseInt(req.userInfo.permissionLevel);

    if (req.params && req.params.userId === req.userInfo.id) {
        return next();
    } else {
        if (user_permission_level >= config.permissionLevel.ADMIN) {
            return next();
        } else {
            next(new ForbiddenError(ErrorMessage.UserForbidden, ErrorMessage.DoNotHavePermission));
        }
    }

};

exports.sameUserCantDoThisAction = (req, res, next) => {
    let userId = req.userInfo.id;

    if (req.params.userId !== userId) {
        return next();
    } else {
        next(new ForbiddenError(ErrorMessage.UserForbidden, ErrorMessage.DoNotHavePermission));
    }

};
