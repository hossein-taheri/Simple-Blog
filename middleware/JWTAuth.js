const JWT = require('../helpers/JWT');
const ApiResponse = require('../helpers/responses/ApiResponse');

const JWTAuth = {
    check: (req, res, next) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            let token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return ApiResponse
                    .error(
                        req,
                        res,
                        401,
                        "Incorrect token"
                    );
            } else {
                JWT
                    .verifyAccessToken(token)
                    .then(decoded => {
                        req.user_id = decoded.id;
                        next();
                    })
                    .catch(err => {
                        return ApiResponse
                            .error(
                                req,
                                res,
                                401,
                                "Incorrect token"
                            );
                    });
            }
        } else {
            return ApiResponse
                .error(
                    req,
                    res,
                    401,
                    "Incorrect token"
                );
        }
    },
}

module.exports = JWTAuth;