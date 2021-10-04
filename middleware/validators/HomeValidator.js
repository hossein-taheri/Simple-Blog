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
                    .ExpressValidatorError(
                        req,
                        res,
                        errors
                    )
            else
                next();
        },
    ]
}

module.exports = HomeValidator;