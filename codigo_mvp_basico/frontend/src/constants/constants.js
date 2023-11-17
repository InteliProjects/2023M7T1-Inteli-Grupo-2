/**
 * This file contains constants used in different components
 * @constant ec2UrlUsers: constant that contains the URL of the users' microservice Load Balancer responsible for the users' requests
 * @constant ec2UrlProducts: constant that contains the URL of the products' microservice Load Balancer responsible for the products' requests
 * @constant ec2UrlSales: constant that contains the URL of the sales' microservice Load Balancer responsible for the sales' requests
 * @constant validateEmail: function that validates the email
 * @constant validatePhone: function that validates the phone
 */

const ec2UrlUsers = 'http://a26dc81ca70d644bf9801fa1d1cb3be6-21369417.us-east-1.elb.amazonaws.com:3333'
const ec2UrlProducts = 'http://a21d286709ae249a6b1a7169025d0420-333352612.us-east-1.elb.amazonaws.com:3333'
const ec2UrlSales = 'http://a4b27a00d9f2c4ae594ce792f4ce4358-1113394000.us-east-1.elb.amazonaws.com:3333'

function validateEmail(email) {
    const emailRegex1 = /[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+/i;
    const emailRegex2 = /[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+\.[A-Za-z]/i;
    return emailRegex1.test(email) || emailRegex2.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /\(\d\d\) [0-9]+-[0-9]+/i;
    return phoneRegex.test(phone);
}

module.exports = { ec2UrlUsers, ec2UrlProducts, ec2UrlSales, validateEmail, validatePhone }