const ApiResponse = require("../helpers/responses/ApiResponse");
module.exports = (app) => {
    //If request is here , then no route has not been found
    app.use((req, res) => {
        return ApiResponse
            .error(
                req,
                res,
                404,
                'Not found'
            )
    });
}