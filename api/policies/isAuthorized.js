/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function isAuthorized(req, res, next) {
  let token;

  if (req.headers && req.headers['x-enyo-token'] && req.headers['x-enyo-token'].indexOf('Bearer') > -1) {
    const parts = req.headers['x-enyo-token'].split(' ');
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer:?$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.status(401).json({
        errors: ['error_no_authorization_header_for_agent'],
        message: 'error_no_authorization_wrong_format_for_agent'
      });
    }
  } else if (req.query.token) {
    token = req.query.token;
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return res.status(401).json({
      message: 'error_no_authorization_header_for_agent',
      errors: ['error_no_authorization_header_for_agent']
    });
  }
  if (!token || token !== sails.config.authKey) {
    return res.status(401).json({
      errors: ['error_invalid_token_for_agent'],
      message: 'error_invalid_token_for_agent'
    });
  }
  next();
};
