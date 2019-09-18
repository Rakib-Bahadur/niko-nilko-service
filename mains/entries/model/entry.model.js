const mongoose = require('mongoose');
const config = require('../../common/config/app.config');
const ServerError = require('../../common/models/error.server.error.model');
const ErrorMessage = require('../../common/config/error.message.config');

mongoose.connect(config.AppDBConnectionString, { useNewUrlParser: true , useUnifiedTopology: true });
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    userId: String,
    projectId: String,
    entryState: Number,
    entryTime: Date,
    updateTime: Date
});

entrySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
entrySchema.set('toJSON', {
    virtuals: true
});

entrySchema.findById = function (cb) {
    return this.model('Entry').find({id: this.id}, cb);
};

const Entry = mongoose.model('Entry', entrySchema);

exports.findByUserId = (userId) => {
    return Entry.find({userId: userId});
};

exports.findByProjectId = (projectId) => {
    return Entry.find({projectId: projectId});
};

exports.findById = (id) => {
    return Entry.findById(id)
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

exports.createEntry = (entryData) => {
    const entry = new Entry(entryData);
    return entry.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Entry.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                }
            })
    });
};

exports.patchEntry = (id, entryData) => {
    return new Promise((resolve, reject) => {
        Entry.findById(id, function (err, entry) {
            if (err) reject(err);
            for (let i in entryData) {
                entry[i] = entryData[i];
            }
            entry.save(function (err, updatedEntry) {
                if (err) return reject(err);
                resolve(updatedEntry);
            });
        });
    })

};

exports.removeById = (entryId) => {
    return new Promise((resolve, reject) => {
        Entry.remove({_id: entryId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};