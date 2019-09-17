const UserModel = require('../model/user.model');
const crypto = require('crypto');
const Response = require('../../common/models/response.success.model');
const ResponseList = require('../../common/models/response.list.success.model');
const ServerError = require('../../common/models/error.server.error.model');
const ErrorMessage = require('../../common/config/error.message.config');

exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.Password).digest("base64");
    req.body.Password = salt + "$" + hash;
    UserModel.createUser(req.body)
        .then((result) => {
            res.status(201).send(new Response({result}));
        }).catch(reason => {
            console.log(reason);
            throw new ServerError(ErrorMessage.ServerProblem, reason);
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    UserModel.list(limit, page)
        .then((result) => {
            res.send(new ResponseList(result));
        }).catch(reason => {
            console.log(reason);
            throw new ServerError(ErrorMessage.ServerProblem, reason);
        });
};

exports.getById = (req, res) => {
    UserModel.findById(req.params.userId)
        .then((result) => {
            res.send(new Response(result));
        }).catch(reason => {
            console.log(reason);
            throw new ServerError(ErrorMessage.ServerProblem, reason);
        });
};
exports.patchById = (req, res) => {
    if (req.body.Password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.Password).digest("base64");
        req.body.Password = salt + "$" + hash;
    }

    UserModel.patchUser(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send(new Response());
        }).catch(reason => {
            console.log(reason);
            throw new ServerError(ErrorMessage.ServerProblem, reason);
        });

};

exports.removeById = (req, res) => {
    UserModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send(new Response());
        }).catch(reason => {
            console.log(reason);
            throw new ServerError(ErrorMessage.ServerProblem, reason);
        });
};