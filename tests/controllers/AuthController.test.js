const database = require('../bootstrap/test_database_connection');
const User = require("../../model/User");
const Password = require("../../helpers/Password");
const AuthController = require('../../controller/AuthController');
const JWT = require("../../helpers/JWT");

beforeAll((done) => {
    database
        .connect()
        .then(() => {
            console.log("Successfully connected to MongoDB.")
            done()
        })
        .catch(err => {
            console.log("Connection error")
            done()
        })
})

describe("Login method", () => {
    let user;
    beforeAll(async () => {
        user = new User({
            first_name: 'test_first_name',
            last_name: 'test_last_name',
            email: 'test_email',
            hash: 'test_hash',
            salt: 'test_salt'
        });
        user = await user.save();
    })

    test('should fail if email is not correct', async () => {
        let req = {
            body: {
                email: 'test2@test.com',
                password: user.password
            }
        }
        let res = await AuthController.login(req, {})
        expect(res.status).toBe(406)
    })
    test('should fail if password is not correct', async () => {
        let req = {
            body: {
                email: user.email,
                password: '123456'
            }
        }
        Password.validPassword = jest.fn().mockReturnValue(false)
        let res = await AuthController.login(req, {})
        expect(res.status).toBe(406)
    })


    test('should pass if email and password are correct', async () => {
        let req = {
            body: {
                email: user.email,
                password: '123456'
            }
        }
        JWT.issueAccessToken = jest.fn().mockReturnValue('123')
        JWT.issueRefreshToken = jest.fn().mockReturnValue('456')
        Password.validPassword = jest.fn().mockReturnValue(true)
        let res = await AuthController.login(req, {})
        expect(res.status).toBe(200)
        expect(res.data.AccessToken).toBe('123')
        expect(res.data.RefreshToken).toBe('456')
    })

    afterAll(async () => {
        await User.deleteMany({})
    })
})

describe("RefreshToken method", () => {
    let user;
    beforeAll(async () => {
        user = new User({
            first_name: 'test_first_name',
            last_name: 'test_last_name',
            email: 'test_email',
            hash: 'test_hash',
            salt: 'test_salt'
        });
        user = await user.save();
    })

    test('should fail if refreshToken is not entered', async () => {
        let req = {
            body: {}
        }
        let res = await AuthController.refreshToken(req, {})
        expect(res.status).toBe(406)
    })

    test('should fail if refreshToken is not correct', async () => {
        let req = {
            body: {
                refresh_token: '123'
            }
        }
        let res = await AuthController.refreshToken(req, {})
        expect(res.status).toBe(500)
    })

    test('should pass if refreshToken is correct', async () => {
        let req = {
            body: {
                refresh_token: '123'
            }
        }

        JWT.verifyRefreshToken = jest.fn().mockResolvedValue({
            id: user._id
        })
        JWT.issueAccessToken = jest.fn().mockReturnValue('123')

        let res = await AuthController.refreshToken(req, {})

        expect(JWT.verifyRefreshToken).toBeCalledWith('123')
        expect(JWT.issueAccessToken).toBeCalledWith(user._id)
        expect(res.status).toBe(200)
        expect(res.data.AccessToken).toBe('123')
    })

    afterAll(async () => {
        await User.deleteMany({})
    })
})

describe("Register method", () => {
    let user;
    beforeAll(async () => {
        user = new User({
            first_name: 'test_first_name',
            last_name: 'test_last_name',
            email: 'test_email',
            hash: 'test_hash',
            salt: 'test_salt'
        });
        user = await user.save();
    })

    test('should fail if an account already exists with this email', async () => {
        let req = {
            body: {
                email: 'test_email',
                password: user.password
            }
        }
        let res = await AuthController.register(req, {})
        expect(res.status).toBe(406)
    })
    test('should pass if the rest of the data is correct', async () => {
        let req = {
            body: {
                first_name: 'test_first_name_2',
                last_name: 'test_last_name_2',
                email: 'test2@test.com',
                password: '123456'
            }
        }
        Password.genPassword = jest.fn().mockReturnValue({
            hash: 'hash',
            salt: 'salt'
        })

        let res = await AuthController.register(req, {})

        let user = await User.findOne({email: req.body.email});

        expect(Password.genPassword).toBeCalledWith(req.body.password);

        expect(res.status).toBe(200);
        expect(user.first_name).toBe(req.body.first_name);
        expect(user.last_name).toBe(req.body.last_name);
        expect(user.hash).toBe('hash');
        expect(user.salt).toBe('salt');
    })


    afterAll(async () => {
        await User.deleteMany({})
    })
})


afterAll((done) => {
    database
        .disconnect()
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err);
            done()
        })
})