const crypto = require('crypto');


const Password = {
    genPassword : (password) => {
        let salt = crypto.randomBytes(32).toString('hex');
        let genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

        return {
            salt: salt,
            hash: genHash
        };
    } ,
    validPassword : (password, hash, salt) => {
        let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
        return hash == hashVerify;
    } ,
} ;

module.exports = Password ;