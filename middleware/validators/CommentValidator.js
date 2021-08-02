const {body, param, validationResult} = require('express-validator');
const ApiResponse = require('../../helpers/responses/ApiResponse');
const ObjectId = require('mongoose').Types.ObjectId;

const AuthValidator = {
    store: [
        param("post")
            .trim()
            .escape()
            .custom(post => {
                console.log(post)
                if (!ObjectId.isValid(post)) {
                    return Promise.reject("The entered post is not valid");
                } else {
                    return Promise.resolve();
                }
            })
            .bail(),
        body("body")
            .trim()
            .escape()
            .not()
            .isEmpty()
            .bail()
            .isLength({min: 1, max: 255})
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
    ],
    destroy: [
        param("post")
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
        param("comment")
            .trim()
            .escape()
            .custom(comment => {
                if (!ObjectId.isValid(comment)) {
                    return Promise.reject("The entered comment is not valid");
                } else {
                    return Promise.resolve();
                }
            })
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

module.exports = AuthValidator;