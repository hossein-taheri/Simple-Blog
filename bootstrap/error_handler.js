const ApiResponse = require("../helpers/responses/ApiResponse");
module.exports = (app) => {
    //If request is here , then an error has been occurred
    app.use((err, req, res, next) => {
        // Respond with json
        return ApiResponse
            .error(
                req,
                res,
                err.code || 500,
                err.message
            )
    });
}