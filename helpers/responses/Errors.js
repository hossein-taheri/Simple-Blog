const Errors = {
    200: () => {
        return 'OK';
    },
    201: () => {
        return 'Successfully created';
    },
    202: () => {
        return 'Accepted';
    },
    301: () => {
        return 'Moved Permanently';
    },
    302: () => {
        return 'Found';
    },
    400: () => {
        return 'Bad Request';
    },
    401: () => {
        return 'Unauthorized';
    },
    402: () => {
        return 'Payment Required';
    },
    403: () => {
        return 'Forbidden';
    },
    404: () => {
        return 'Not Found';
    },
    405: () => {
        return 'Method Not Allowed';
    },
    406: () => {
        return 'Not Acceptable';
    },
    408: () => {
        return 'Request Timeout';
    },
    429: () => {
        return 'Too Many Requests';
    },
    500: () => {
        return 'Internal Server Errors';
    },
    501: () => {
        return 'Not Implemented';
    },
    502: () => {
        return 'Bad Gateway';
    },
    503: () => {
        return 'Service Unavailable';
    },
}

module.exports = Errors;