const {body, validationResult} = require('express-validator');
const ApiResponse = require('../../helpers/responses/ApiResponse');

const AuthValidator = {
    login: [
        body("email")
            .trim()
            .escape()
            .not()
            .isEmpty()
            .bail()
            .isEmail()
            .normalizeEmail()
            .bail(),
        body("password")
            .trim()
            .escape()
            .not()
            .isEmpty()
            .bail()
            .isLength({min: 6, max: 20})
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
    ],
    refreshToken: [
        body("refresh_token")
            .trim()
            .escape()
            .not()
            .isEmpty()
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
    ],
    register: [
        body("first_name")
            .trim()
            .escape()
            .not()
            .isEmpty()
            .bail()
            .isLength({min: 3, max: 16})
            .bail(),
        body("last_name")
            .trim()
            .escape()
            .not()
            .isEmpty()
            .bail()
            .isLength({min: 3, max: 16})
            .bail(),
        body("password")
            .trim()
            .escape()
            .not()
            .isEmpty()
            .bail()
            .isLength({min: 6, max: 20})
            .bail(),
        body("email")
            .trim()
            .escape()
            .not()
            .isEmpty()
            .bail()
            .isEmail()
            .normalizeEmail()
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
    ],

}

module.exports = AuthValidator;