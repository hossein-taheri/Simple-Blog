const JWT = require('../helpers/JWT');
const {Unauthorized} = require("../helpers/CustomErrors");

const JWTAuth = {
    check: async (req, res, next) => {
        try {
            if (!(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
                throw new Unauthorized("Incorrect token")
            }

            let token = req.headers.authorization.split(' ')[1];

            if (!token) {
                throw new Unauthorized("Incorrect token")
            }

            let decoded = await JWT.verifyAccessToken(token)

            req.user_id = decoded.id;

            next();
        } catch (err) {
            next(err)
        }
    },
}

module.exports = JWTAuth;