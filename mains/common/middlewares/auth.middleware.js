const UserModel = require('../../users/model/user.model');
const UnauthorizedError = require('../models/error.unauthorized.model');
const ServerError = require('../models/error.server.error.model');
const ErrorMessage = require('../config/error.message.config');
const crypto = require('crypto');

exports.authenticateUser = (req, res, next)=>{
    let b64auth = (req.headers['authorization'] || '').split(' ')[1] || '';
    const [email, password] = new Buffer(b64auth, 'base64').toString().split(':');
    UserModel.findByEmail(email)
        .then((user)=>{
            if(!user[0]){
                next(new UnauthorizedError(ErrorMessage.UserUnauthorized, ErrorMessage.GiveValidAuth));
            }else{
                let passwordField = user[0].Password.split('$');
                let salt = passwordField[0];
                let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
                if(passwordField[1] === hash) {
                    req.userInfo = user[0];
                    return next();
                } else {
                    next(new UnauthorizedError(ErrorMessage.UserUnauthorized, ErrorMessage.GiveValidAuth));
                }
            }
        }).catch((reason)=>{
            console.log(reason);
            next(new ServerError(ErrorMessage.ServerProblem, reason));
        });
}