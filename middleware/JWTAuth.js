const JWT = require('../helpers/JWT') ;
const ApiResponse = require('../helpers/responses/ApiResponse') ;
// const User = require('../models/User') ;

const JWTAuth = {
    check :  ( req , res , next ) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            let token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return ApiResponse
                    .error(
                        req ,
                        res ,
                        401 ,
                        'توکن به درستی وارد نشده است'
                    ) ;
            } else {
                JWT
                    .verifyJWT( token )
                    .then( decoded => {
                        req.user_id = decoded.id ;
                        next();
                    })
                    .catch( err => {
                        return ApiResponse
                            .error(
                                req ,
                                res ,
                                401 ,
                                'توکن به درستی وارد نشده است'
                            ) ;
                    }) ;
            }
        } else  {
            return ApiResponse
                .error(
                    req ,
                    res ,
                    401 ,
                    'توکن به درستی وارد نشده است'
                ) ;
        }
    } ,
    checkAdmin :  ( req , res , next ) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            let token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return ApiResponse
                    .error(
                        req ,
                        res ,
                        401 ,
                        'توکن به درستی وارد نشده است'
                    );
            } else {
                JWT
                    .verifyJWT( token )
                    .then( decoded => {
                        User
                            .findOne({
                                _id : decoded.id ,
                            })
                            .then( user => {
                                if ( user && user.role === "admin" ) {
                                    req.user = user ;
                                    next();
                                } else {
                                    return ApiResponse
                                        .error(
                                            req ,
                                            res ,
                                            401 ,
                                            'توکن به درستی وارد نشده است'
                                        ) ;
                                }
                            })
                            .catch(err => {
                                return ApiResponse
                                    .error(
                                        req ,
                                        res ,
                                        401 ,
                                        'توکن به درستی وارد نشده است'
                                    ) ;
                            })
                    })
                    .catch( err => {
                        return ApiResponse
                            .error(
                                req ,
                                res ,
                                401 ,
                                'توکن به درستی وارد نشده است'
                            ) ;
                    }) ;
            }
        } else  {
            return ApiResponse
                .error(
                    req ,
                    res ,
                    401 ,
                    'توکن به درستی وارد نشده است'
                ) ;
        }
    }
}

module.exports = JWTAuth ;