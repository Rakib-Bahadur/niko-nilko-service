const mongoose = require('mongoose');
const config = require('../../common/config/app.config');
const ServerError = require('../../common/models/error.server.error.model');
const ErrorMessage = require('../../common/config/error.message.config');

mongoose.connect(config.AppDBConnectionString, { useNewUrlParser: true , useUnifiedTopology: true });
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: String,
    description: String,
    members: Array,
    createdBy: String,
    createTime: Date,
    updateTime: Date
});

projectSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
projectSchema.set('toJSON', {
    virtuals: true
});

projectSchema.findById = function (cb) {
    return this.model('Project').find({id: this.id}, cb);
};

const Project = mongoose.model('Project', projectSchema);

exports.findByCreatedBy = (creatorId) => {
    return Project.find({createdBy: creatorId});
};

exports.findById = (id) => {
    return Project.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        }).catch(reason => {
            console.log(reason);
            throw new ServerError(ErrorMessage.ServerProblem, reason);
        });;
};

exports.createProject = (projectData) => {
    const project = new Project(projectData);
    return project.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Project.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, projects) {
                if (err) {
                    reject(err);
                } else {
                    resolve(projects);
                }
            })
    });
};

exports.patchProject = (id, projectData) => {
    return new Promise((resolve, reject) => {
        Project.findById(id, function (err, project) {
            if (err) reject(err);
            for (let i in projectData) {
                project[i] = projectData[i];
            }
            project.save(function (err, updatedProject) {
                if (err) return reject(err);
                resolve(updatedProject);
            });
        });
    })

};

exports.removeById = (projectId) => {
    return new Promise((resolve, reject) => {
        Project.remove({_id: projectId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};