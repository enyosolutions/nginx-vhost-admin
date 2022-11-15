const hasAccount = require('./hasAccount');
/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function hasCorrectIp(req, res, next) {
  if (sails.config.security.disableIpFiltering === true || sails.config.security.disableIpFiltering === 1) {
    return hasAccount(req, res, next);
  }
  const clientIp = sails.config.security.useRealIp ? req.ip : (req.headers['x-real-ip'] || req.headers['x-forwarded-for']);

  console.log('requested ', req.path, 'with ip', req.ip, 'USED IP', clientIp, sails.config.security.whitelistedIps);

  // if ip is whitelisted go to next policy
  if (clientIp && sails.config.security && sails.config.security.whitelistedIps && (
    sails.config.security.whitelistedIps.includes(clientIp)
  )) {
    return hasAccount(req, res, next);
  }
  // if there is a list of users let request continue
  if (sails.config.security && sails.config.security.users && Object.keys(sails.config.security.users).length) {
    return hasAccount(req, res, next);
  }
  res.status(401).send('☠️');
};
