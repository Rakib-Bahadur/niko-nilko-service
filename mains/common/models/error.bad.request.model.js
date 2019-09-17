class BadRequestError extends Error {
    status = 'failure';
    statusCode = 400;
    details = ''
    constructor(message, details){
        super(message || '');
        this.details = details || ''
    }
}
module.exports = BadRequestError;