let JWT;
const jsonwebtoken = require("jsonwebtoken");


beforeAll(async () => {
    await require('dotenv').config()
    JWT = require("../../helpers/JWT");
})

describe('IssueAccessToken method and VerifyAccessToken method', () => {
    test('should fail if token is RefreshToken', async () => {
        let id = 'Example Id for testing';

        let {
            token: access_token,
            expiresIn
        } = JWT.issueRefreshToken(id)

        try {
            await JWT.verifyAccessToken(access_token);
        } catch (err) {
            expect(err.message).toBe("Token is not an access token");
        }
    })

    test('should fail if token is not valid', async () => {
        let id = 'Example Id for testing';
        let access_token = 'access_token';

        try {
            await JWT.verifyAccessToken(access_token);
        } catch (err) {
            expect(err.message).toBe("jwt malformed");
        }
    })

    test('should return the id from AccessToken', async () => {
        let id = 'Example Id for testing';

        let {
            token: access_token,
            expiresIn
        } = JWT.issueAccessToken(id)

        expect(expiresIn).toEqual("1h");

        let decoded_access_token = await JWT.verifyAccessToken(access_token.split(' ')[1]);

        expect(decoded_access_token.type).toBe("AccessToken");
        expect(decoded_access_token.id).toBe(id);
    })
})


describe('IssueRefreshToken method and VerifyRefreshToken method', () => {
    test('should fail if token is AccessToken', async () => {
        let id = 'Example Id for testing';

        let {
            token: refresh_token,
            expiresIn
        } = JWT.issueAccessToken(id)

        try {
            await JWT.verifyRefreshToken(refresh_token.split(' ')[1]);
        } catch (err) {
            expect(err.message).toBe("Token is not a refresh token");
        }
    })

    test('should fail if token is not valid', async () => {
        let id = 'Example Id for testing';
        let refresh_token = 'refresh_token';

        try {
            await JWT.verifyRefreshToken(refresh_token);
        } catch (err) {
            expect(err.message).toBe("jwt malformed");
        }
    })

    test('should return the id from RefreshToken', async () => {
        let id = 'Example Id for testing';

        let {
            token: refresh_token,
            expiresIn
        } = JWT.issueRefreshToken(id)

        expect(expiresIn).toEqual("1d");

        let decoded_refresh_token = await JWT.verifyRefreshToken(refresh_token);

        expect(decoded_refresh_token.type).toBe("RefreshToken");
        expect(decoded_refresh_token.id).toBe(id);
    })
})

