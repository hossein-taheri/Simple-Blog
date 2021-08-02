const Errors = require('./Errors');

const ApiResponse = {
    response: (req, res, status_code, messages, data) => {
        // if (global.areWeTestingWithJest) {
        if (process.env.JEST_WORKER_ID !== undefined) {
            return {
                status: status_code,
                messages: messages,
                data: data,
            }
        } else {
            res.status = status_code ;
            return res.json({
                status: status_code,
                messages: messages,
                data: data,
            });
        }
    },
    errors: (req, res, err_code, err_messages) => {
        return ApiResponse
            .response(
                req,
                res,
                err_code,
                Errors.errors(err_messages),
                null
            )
    },
    error: (req, res, err_code, err_message) => {
        return ApiResponse
            .response(
                req,
                res,
                err_code,
                Errors.error(err_message),
                null
            );
    },
    serverError: (req, res, err) => {
        console.log(err.message)
        return ApiResponse
            .error(
                req,
                res,
                500,
                Errors.serverError()
            );
    },
    message: (req, res, message, data) => {
        return ApiResponse
            .response(
                req,
                res,
                200,
                Errors.message(message),
                data
            );
    }
}

module.exports = ApiResponse;