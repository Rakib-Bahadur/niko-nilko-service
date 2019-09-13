class ServerError extends Error {
    status = 'failure';
    statusCode = 500;
    details = ''
    constructor(message, details){
        super(message || '');
        details = details || ''
    }
}
module.exports = ServerError;