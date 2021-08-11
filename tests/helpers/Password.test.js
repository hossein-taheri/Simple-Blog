const Password = require('../../helpers/Password');


describe('GenPassword method and ValidPassword method', () => {

    test('should fail if password is not correct', async () => {
        let password = 'Example Password';

        let {hash, salt} = Password.genPassword(password)

        expect(Password.validPassword("Password Example",hash,salt)).toBe(false)
    })
    test('should succeed if password is correct', async () => {
        let password = 'Example Password';

        let {hash, salt} = Password.genPassword(password)

        expect(Password.validPassword(password,hash,salt)).toBe(true)
    })

})
