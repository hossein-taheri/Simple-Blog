const Errors = require('./Errors');

const ApiResponse = {
    response: (req, res, status_code, messages, data) => {
        if (process.env.JEST_WORKER_ID !== undefined) {
            return {
                status: status_code,
                messages: messages,
                data: data,
            }
        } else {
            res.status = status_code;
            return res.json({
                status: status_code,
                messages: messages,
                data: data,
            });
        }
    },
    error: (req, res, err_code, ...err_messages) => {
        return ApiResponse
            .response(
                req,
                res,
                err_code,
                err_messages,
                null
            );
    },
    message: (req, res, message, data) => {
        return ApiResponse
            .response(
                req,
                res,
                200,
                (message ? [message] : []),
                data
            );
    },
    ExpressValidatorError: (req, res, err_messages) => {
        return ApiResponse
            .error(
                req,
                res,
                400,
                err_messages.array(),
            )
    }
}

module.exports = ApiResponse;