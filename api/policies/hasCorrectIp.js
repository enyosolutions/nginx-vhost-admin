/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function hasCorrectIp(req, res, next) {
  if (sails.config.security.disabledIpFiltering === true || sails.config.security.disabledIpFiltering === 1) {
    return next();
  }
  console.log('requested ', req.path, 'with ip', req.ip, sails.config.security.whitelistedIps);
  if (req.ip && sails.config.security && sails.config.security.whitelistedIps && sails.config.security.whitelistedIps.includes(req.ip)) {
    return next();
  }
  res.status(401).send();
};
