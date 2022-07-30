const ApiResponse = require("../helpers/responses/ApiResponse");
const {NotFound} = require("../helpers/CustomErrors");
module.exports = (app) => {
    //If request is here , then no route has not been found
    app.use((req, res) => {
        throw new NotFound('Route Not found')
    });
}