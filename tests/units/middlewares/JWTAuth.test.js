const JWTAuth = require('../../../middleware/JWTAuth');
const JWT = require("../../../helpers/JWT");
const jestMock = jest.fn();

describe('Check method', () => {
    test('test must fails if token has not been set', async () => {
        let req = {
            headers: {}
        }
        let res = {};
        res = await JWTAuth.check(req, res);
        expect(res.status).toBe(401);
    });
    test('test must fails if token has not been set correctly', async () => {
        let req = {
            headers: {
                authorization: 'Not Bearer',
            }
        }
        let res = {};
        res = await JWTAuth.check(req, res);
        expect(res.status).toBe(401);
    });
    test('test must fails if token has not been set correctly', async () => {
        let req = {
            headers: {
                authorization: 'Bearer ',
            }
        }
        let res = {};
        res = await JWTAuth.check(req, res);
        expect(res.status).toBe(401);
    });
    test('test must fails if token has not been set correctly', async () => {
        let req = {
            headers: {
                authorization: 'Bearer 123',
            }
        }
        JWT.verifyAccessToken = jestMock.mockRejectedValue(new Error("Token is not valid"))

        let res = {};
        JWTAuth.check(req, res)
            .catch(res => {
                expect(JWT.verifyAccessToken).toBeCalledWith('123');
                expect(JWT.verifyAccessToken).toBeCalledTimes(1);
                expect(res.status).toBe(401);
            })
    });
    test('test must pass if token is valid', async () => {
        let req = {
            headers: {
                authorization: 'Bearer 123',
            }
        }
        JWT.verifyAccessToken = jestMock.mockResolvedValue({
            id: '12345'
        })
        let res = {};
        await JWTAuth.check(req, res, () => {
            expect(JWT.verifyAccessToken).toBeCalledWith('123');
            expect(JWT.verifyAccessToken).toBeCalledTimes(1);
            expect(req.user_id).toBe('12345');
        })
    });
})