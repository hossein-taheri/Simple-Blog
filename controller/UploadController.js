const ApiResponse = require("../helpers/responses/ApiResponse");
const {NotAcceptable} = require("../helpers/CustomErrors");

const UploadController = {
    uploadImage: (req, res) => {
        try {
            if (!req.files) {
                throw new NotAcceptable("Enter the files")
            }

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
