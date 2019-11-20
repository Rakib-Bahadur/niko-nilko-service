const EntryModel = require('../model/entry.model');
const ForbiddenError = require('../../common/models/error.forbidden.model');
const ServerError = require('../../common/models/error.server.error.model');
const ErrorMessage = require('../../common/config/error.message.config');

exports.onlyCreatorCanDoThis = (req, res, next) => {
    EntryModel.findById(req.params.entryId)
        .then((result) => {
            if(result.createdBy === req.userInfo.id)
                return next();
            else
                next(new ForbiddenError(ErrorMessage.UserForbidden, ErrorMessage.DoNotHavePermission));
        }).catch(reason => {
            console.log(reason);
            next(new ServerError(ErrorMessage.ServerProblem, reason.message));
        });
}