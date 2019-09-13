const UserModel = require('../model/user.model');
const UnAcceptableError = require('../../common/models/error.unacceptable.model');
const ServerError = require('../../common/models/error.server.error.model');
const ErrorMessage = require('../../common/config/error.message.config');

exports.isUserAlreadyRegisterd = (req, res, next) => {
    UserModel.findByEmail(req.body.Email)
        .then((user)=>{
            if(user[0]){
                throw new UnAcceptableError(ErrorMessage.UserExists);
            } else {
                return next();
            }
        }).catch(reason => {
            console.log(reason);
            throw new ServerError(ErrorMessage.ServerProblem, reason);
        });
}