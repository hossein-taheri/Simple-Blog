const jsonwebtoken = require('jsonwebtoken') ;
const fs = require('fs');
const privateKEY = process.env.PRIVATE_KEY ;
const publicKEY = process.env.PUBLIC_KEY ;

const JWT = {
    issueAccessToken : ( id ) => {
        const signOptions = {
            expiresIn : "1h" ,
            algorithm:  "RS256" ,
        } ;
        const payload = {
            id : id,
            type : 'AccessToken'
        } ;
        const signedToken = jsonwebtoken.sign( payload , privateKEY ,  signOptions ) ;

        return {
            token : "Bearer " + signedToken ,
            expiresIn : signOptions.expiresIn ,
        }
    } ,
    verifyAccessToken : ( token ) => {
        return new Promise((resolve, reject) => {
            const verifyOptions = {
                expiresIn: "1d",
                algorithm: "RS256"
            };
            jsonwebtoken.verify(token, publicKEY, verifyOptions, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                if (decoded.type !== 'AccessToken'){
                    reject(new Error('Token is not an access token'))
                }
                resolve(decoded);
            });
        });
    },
    issueRefreshToken : ( id ) => {
        const signOptions = {
            expiresIn : "1d" ,
            algorithm:  "RS256" ,
        } ;
        const payload = {
            id : id,
            type : 'RefreshToken'
        } ;
        const signedToken = jsonwebtoken.sign( payload , privateKEY ,  signOptions ) ;

        return {
            token : signedToken ,
            expiresIn : signOptions.expiresIn ,
        }
    } ,
    verifyRefreshToken : ( token ) => {
        return new Promise((resolve, reject) => {
            const verifyOptions = {
                expiresIn: "1d",
                algorithm: "RS256"
            };
            jsonwebtoken.verify(token, publicKEY, verifyOptions, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                if (decoded.type !== "RefreshToken"){
                    reject(new Error('Token is not an access token'))
                }
                resolve(decoded);
            });
        });
    },
}

module.exports = JWT ;