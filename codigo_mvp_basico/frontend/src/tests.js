const { validateEmail, validatePhone } = require('./constants/constants');
const assert = require('chai').assert; // Using Assert style

describe('Validate email', () => {
    const invalidEmails = [
        'invalidemail',
        'user@domain',
        'test@.com',
        'test@com.',
    ]

    const validEmails = [
        'test@example.com',
        'user@domain.co.uk',
        '123@abc.xyz',
    ];


    it('Should return false when the email is invalid', () => {
        invalidEmails.forEach(email => {
            assert.equal(validateEmail(email), false);
        });
    });

    it('Should return true when the email is valid', () => {
        validEmails.forEach(email => {
            assert.equal(validateEmail(email), true);
        });
    });

});


describe('Validate phone', () => {
    const validPhones = [
        '(12) 99456-7890',
        '(45) 99789-0123',
        '(11) 2052-8923'
    ];

    const invalidPhones = [
        '123-456-7890',
        '(123) 456-789',
        '(123) 456-78901',
        'abc',
    ];

    it('Should return false when the phone is invalid', () => {
        invalidPhones.forEach(phone => {
            assert.equal(validatePhone(phone), false);
        });
    });

    it('Should return true when the phone is valid', () => {
        validPhones.forEach(phone => {
            assert.equal(validatePhone(phone), true);
        });
    });
})