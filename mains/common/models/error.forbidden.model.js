class ForbiddenError extends Error {
    status = 'failure';
    statusCode = 403;
    details = ''
    constructor(message, details){
        super(message || '');
        this.details = details || ''
    }
}
module.exports = ForbiddenError;