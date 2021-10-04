const {body, param, query, validationResult} = require('express-validator');
const ApiResponse = require('../../helpers/responses/ApiResponse');
const ObjectId = require('mongoose').Types.ObjectId;

const PostValidator = {
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
    ],
    show: [
        param('post')
            .trim()
            .escape()
            .custom(post => {
                if (!ObjectId.isValid(post)) {
                    return Promise.reject("The entered post is not valid");
                } else {
                    return Promise.resolve();
                }
            })
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
    store: [
        body("title")
            .trim()
            .escape()
            .not()
            .isEmpty()
            .bail()
            .isLength({min: 3, max: 100})
            .bail(),
        body("description")
            .trim()
            .escape()
            .not()
            .isEmpty()
            .bail()
            .isLength({min: 3, max: 1000})
            .bail(),
        body("images")
            .optional()
            .bail()
            .isArray({min: 0, max: 10})
            .bail(),
        body("images.*")
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
    update: [
        param('post')
            .trim()
            .escape()
            .custom(post => {
                if (!ObjectId.isValid(post)) {
                    return Promise.reject("The entered post is not valid");
                } else {
                    return Promise.resolve();
                }
            })
            .bail(),
        body("title")
            .trim()
            .escape()
            .optional()
            .not()
            .isEmpty()
            .bail()
            .isLength({min: 3, max: 100})
            .bail(),
        body("description")
            .trim()
            .escape()
            .optional()
            .not()
            .isEmpty()
            .bail()
            .isLength({min: 3, max: 1000})
            .bail(),
        body("images")
            .optional()
            .bail()
            .isArray({min: 0, max: 10})
            .bail(),
        body("images.*")
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
    destroy: [
        param('post')
            .trim()
            .escape()
            .custom(post => {
                if (!ObjectId.isValid(post)) {
                    return Promise.reject("The entered post is not valid");
                } else {
                    return Promise.resolve();
                }
            })
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

module.exports = PostValidator;