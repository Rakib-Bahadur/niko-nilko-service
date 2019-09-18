const EntryModel = require('../model/entry.model');
const moment = require('moment');
const Response = require('../../common/models/response.success.model');
const ResponseList = require('../../common/models/response.list.success.model');
const ServerError = require('../../common/models/error.server.error.model');
const ErrorMessage = require('../../common/config/error.message.config');

exports.insert = (req, res) => {
    req.body.entryTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    req.body.updateTime = req.body.entryTime;
    EntryModel.createEntry(req.body)
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
    EntryModel.list(limit, page)
        .then((result) => {
            res.send(new ResponseList(result));
        }).catch(reason => {
            console.log(reason);
            throw new ServerError(ErrorMessage.ServerProblem, reason);
        });
};

exports.getById = (req, res) => {
    EntryModel.findById(req.params.entryId)
        .then((result) => {
            res.send(new Response(result));
        }).catch(reason => {
            console.log(reason);
            throw new ServerError(ErrorMessage.ServerProblem, reason);
        });
};
exports.patchById = (req, res) => {
    req.body.updateTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    EntryModel.patchEntry(req.params.entryId, req.body)
        .then((result) => {
            res.status(204).send(new Response());
        }).catch(reason => {
            console.log(reason);
            throw new ServerError(ErrorMessage.ServerProblem, reason);
        });

};

exports.removeById = (req, res) => {
    EntryModel.removeById(req.params.entryId)
        .then((result)=>{
            res.status(204).send(new Response());
        }).catch(reason => {
            console.log(reason);
            throw new ServerError(ErrorMessage.ServerProblem, reason);
        });
};