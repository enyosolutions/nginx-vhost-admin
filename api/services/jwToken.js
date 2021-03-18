/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See
 *              :: https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

const
  jwt = require('jsonwebtoken');

// Generates a token from supplied payload
module.exports.issue = (payload, expiry) => jwt.sign(
  payload,
  sails.config.tokenSecret, // Token Secret that we sign it with
  {
    expiresIn: expiry || '7d' // Token Expire time
  }
);

/* eslint-disable */
module.exports.generateFor = user => issue({
  _id: user._id,
  username: user.username,
  email: user.email,
  firstname: user.firstname,
  lastname: user.lastname,
  roles: user.roles,
});
/* eslint-enable */
// Verifies token on a request
module.exports.verify = (token, callback) => jwt.verify(
  token, // The token to be verified
  sails.config.tokenSecret, // Same token we used to sign
  {}, // No Option,
  // for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
  callback // Pass errors or decoded token to callback
);
