const ApiResponse = require("../helpers/responses/ApiResponse");

const UploadController = {
    uploadImage: (req, res, next) => {
        try {
            if (req.files) {
                let fileNames = [];
                for (let i = 0; i < req.files.length; i++) {
                    fileNames.push(req.files[i].filename)
                }
                return ApiResponse
                    .message(
                        req,
                        res,
                        null,
                        fileNames
                    );
            } else {
                return ApiResponse
                    .error(
                        req,
                        res,
                        406,
                        "Enter the files"
                    );
            }
        } catch (err) {
            return ApiResponse
                .error(
                    req,
                    res,
                    err.code || 500,
                    err.message
                )
        }
    }
}

module.exports = UploadController;
