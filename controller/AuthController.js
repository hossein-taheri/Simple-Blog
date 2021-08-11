const User = require("../model/User");
const ApiResponse = require("../helpers/responses/ApiResponse");
const JWT = require("../helpers/JWT");
const Password = require("../helpers/Password");
const AuthController = {
    login: async (req, res) => {
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
                .serverError(
                    req,
                    res,
                    err
                );
        }
    },
    refreshToken: async (req, res) => {
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
                .serverError(
                    req,
                    res,
                    err
                );
        }
    },
    register: async (req, res) => {
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
            return ApiResponse
                .serverError(
                    req,
                    res,
                    err
                );
        }
    },
}

module.exports = AuthController;