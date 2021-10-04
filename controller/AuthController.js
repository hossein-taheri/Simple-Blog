const User = require("../model/User");
const ApiResponse = require("../helpers/responses/ApiResponse");
const JWT = require("../helpers/JWT");
const Password = require("../helpers/Password");
const {InternalServerErrors} = require("../helpers/CustomErrors");
const {NotAcceptable} = require("../helpers/CustomErrors");
const {NotFound} = require("../helpers/CustomErrors");
const AuthController = {
    login: async (req, res, next) => {
        try {
            let user = await User
                .findOne({
                    email: req.body.email
                })

            if (!user) {
                return ApiResponse
                    .error(
                        req,
                        res,
                        406,
                        "Incorrect email or password"
                    );
            }

            const passwordIsValid = Password
                .validPassword(
                    req.body.password,
                    user.hash,
                    user.salt
                );


            if (!passwordIsValid) {
                return ApiResponse
                    .error(
                        req,
                        res,
                        406,
                        "Incorrect email or password"
                    );
            }


            const accessToken = JWT.issueAccessToken(user._id);
            const refreshToken = JWT.issueRefreshToken(user._id);


            return ApiResponse
                .message(
                    req,
                    res,
                    "Successfully logged in",
                    {
                        AccessToken: accessToken,
                        RefreshToken: refreshToken
                    }
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
    },
    refreshToken: async (req, res, next) => {
        try {
            let refreshToken = req.body.refresh_token;
            if (!refreshToken) {
                return ApiResponse
                    .error(
                        req,
                        res,
                        406,
                        "Enter the refresh token"
                    );
            } else {
                let decoded = await JWT.verifyRefreshToken(refreshToken)

                let user = await User.findOne({
                    _id: decoded.id,
                })

                if (user) {
                    let accessToken = JWT.issueAccessToken(user._id);
                    return ApiResponse
                        .message(
                            req,
                            res,
                            "The token was successfully refreshed",
                            {
                                AccessToken: accessToken
                            }
                        );
                } else {
                    return ApiResponse
                        .error(
                            req,
                            res,
                            406,
                            "The refresh token is incorrect"
                        );
                }
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
    },
    register: async (req, res, next) => {
        try {
            let user = await User
                .findOne({
                    email: req.body.email
                })


            if (user && (user.email.toString() === req.body.email.toString())) {
                return ApiResponse
                    .error(
                        req,
                        res,
                        406,
                        "The entered email already has selected"
                    );
            }

            if (!req.body.password){
                throw new InternalServerErrors("The entered password is not correct")
            }

            let password = Password.genPassword(req.body.password)

            user = new User(
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    salt: password.salt,
                    hash: password.hash,
                    register_at: Date.now(),
                });

            await user.save()

            return ApiResponse
                .message(
                    req,
                    res,
                    "Account registered successfully",
                    null
                );
        } catch (err) {
            console.log(err)
            return ApiResponse
                .error(
                    req,
                    res,
                    (err.code ? err.code : 500),
                    err.message
                )
        }
    },
}

module.exports = AuthController;