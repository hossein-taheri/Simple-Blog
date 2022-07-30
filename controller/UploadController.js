const ApiResponse = require("../helpers/responses/ApiResponse");
const {NotAcceptable} = require("../helpers/CustomErrors");

const UploadController = {
    uploadImage: (req, res, next) => {
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
            next(err);
        }
    }
}

module.exports = UploadController;
