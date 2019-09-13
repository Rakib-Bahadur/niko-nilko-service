const UserModel = require('../model/user.model');
const crypto = require('crypto');
const Response = require('../../common/models/response.success.model');
const ServerError = require('../../common/models/error.server.error.model');
const ErrorMessage = require('../../common/config/error.message.config');

exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.Password).digest("base64");
    req.body.Password = salt + "$" + hash;
    UserModel.createUser(req.body)
        .then((result) => {
            res.status(201).send(new Response({userId: result.userId}));
        }).catch(reason => {
            console.log(reason);
            throw new ServerError(ErrorMessage.ServerProblem, reason);
        });
};