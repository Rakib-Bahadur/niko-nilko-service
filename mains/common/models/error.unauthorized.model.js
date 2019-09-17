class UnauthorizedError extends Error {
    status = 'failure';
    statusCode = 401;
    details = ''
    constructor(message, details){
        super(message || '');
        this.details = details || ''
    }
}
module.exports = UnauthorizedError;