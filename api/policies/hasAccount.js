/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */
const basicAuth = require('express-basic-auth');


module.exports = function hasAccount(req, res, next) {
  console.log('hasAccount', sails.config.security.users);

  if (sails.config.security.users && Object.keys(sails.config.security.users).length) {
    console.log('auth called');

    return basicAuth({
      challenge: true,
      users: sails.config.security.users
    })(req, res, next);
  }
  next();
};
