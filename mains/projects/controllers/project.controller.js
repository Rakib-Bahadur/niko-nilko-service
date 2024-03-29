const ProjectModel = require('../model/project.model');
const moment = require('moment');
const Response = require('../../common/models/response.success.model');
const ResponseList = require('../../common/models/response.list.success.model');
const ServerError = require('../../common/models/error.server.error.model');
const ErrorMessage = require('../../common/config/error.message.config');

exports.insert = (req, res) => {
    req.body.createTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    req.body.updateTime = req.body.createTime;
    req.body.createdBy = req.userInfo.id;
    ProjectModel.createProject(req.body)
        .then((result) => {
            res.status(201).send(new Response(result));
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
    ProjectModel.list(limit, page)
        .then((result) => {
            res.send(new ResponseList(result));
        }).catch(reason => {
            console.log(reason);
            throw new ServerError(ErrorMessage.ServerProblem, reason);
        });
};

exports.getById = (req, res) => {
    ProjectModel.findById(req.params.projectId)
        .then((result) => {
            res.send(new Response(result));
        }).catch(reason => {
            console.log(reason);
            throw new ServerError(ErrorMessage.ServerProblem, reason);
        });
};
exports.patchById = (req, res) => {
    req.body.updateTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    ProjectModel.patchEntry(req.params.projectId, req.body)
        .then((result) => {
            res.status(204).send(new Response());
        }).catch(reason => {
            console.log(reason);
            throw new ServerError(ErrorMessage.ServerProblem, reason);
        });

};

exports.removeById = (req, res) => {
    ProjectModel.removeById(req.params.projectId)
        .then((result)=>{
            res.status(204).send(new Response());
        }).catch(reason => {
            console.log(reason);
            throw new ServerError(ErrorMessage.ServerProblem, reason);
        });
};