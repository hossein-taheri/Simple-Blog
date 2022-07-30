const ApiResponse = require("../helpers/responses/ApiResponse");
module.exports = (app) => {
    app.use((err, req, res, next) => {
        res.statusCode = err.code || 500
        return ApiResponse
            .error(
                req,
                res,
                err.code || 500,
                err.message
            )
    });
}