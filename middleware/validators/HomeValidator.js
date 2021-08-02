const {query, validationResult} = require('express-validator');
const ApiResponse = require('../../helpers/responses/ApiResponse');

const HomeValidator = {
    index: [
        query("page")
            .trim()
            .escape()
            .optional()
            .isNumeric()
            .isInt({min: 1})
            .bail(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return ApiResponse
                    .errors(
                        req,
                        res,
                        403,
                        errors
                    );
            next();
        },
    ]
}

module.exports = HomeValidator;