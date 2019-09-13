class UnAcceptableError extends Error {
    status = 'failure';
    statusCode = 406;
    details = ''
    constructor(message, details){
        super(message || '');
        details = details || ''
    }
}
module.exports = UnAcceptableError;