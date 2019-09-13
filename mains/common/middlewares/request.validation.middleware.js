const BadRequestError = require('../models/error.bad.request.model');
const ErrorMessage = require('../config/error.message.config');

exports.validateRequestparams = (args, optionals) => {
    return (req, res, next) => {
        var missingFields = [];
        var missingOptionalFields = [];
        if(args){
            missingFields = args.filter(arg => {
                return !req.query.hasOwnProperty(arg) && !req.query[arg] === '';
            });
        }
        if(optionals){
            missingOptionalFields = optionals.filter(optional => {
                return !req.query.hasOwnProperty(optional) && !req.query[optional] === '';
            });
        }
        if(missingFields.length > 0) 
            throw new BadRequestError(ErrorMessage.QueryParamMissing, missingFields.join(', ') + ', ' +missingOptionalFields.join(' (Optional), '));
        else 
            return next();
    }
}

exports.validateRequestBody = (args, optionals) => {
    return (req, res, next) => {
        const body = req.body || [];
        var missingFields = [];
        var missingOptionalFields = [];
        if(args){
            missingFields = args.filter(arg => {
                return !body.hasOwnProperty(arg)  && !req.body[arg] === '';
            });
        }
        if(optionals){
            missingOptionalFields = optionals.filter(optional => {
                return !body.hasOwnProperty(optional) && !req.body[optional] === '';
            });
        }
        if(missingFields.length > 0)
            next(new BadRequestError(ErrorMessage.ReqBodyFieldMissing, missingFields.join(', ') + ', ' +missingOptionalFields.join(' (Optional), ')));
        else 
            return next();
    };
}