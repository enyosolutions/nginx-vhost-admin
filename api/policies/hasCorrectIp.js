/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function hasCorrectIp(req, res, next) {
  if (sails.config.security.disableIpFiltering === true || sails.config.security.disableIpFiltering === 1) {
    return next();
  }
  // console.log('requested ', req.path, 'with ip', req.ip, 'Real ip', req.headers['x-real-ip'], sails.config.security.whitelistedIps);
  const clientIp = sails.config.useRealIp ? req.ip : (sails.config.req.headers['x-real-ip'] || sails.config.req.headers['x-real-ip']);
  if (clientIp && sails.config.security && sails.config.security.whitelistedIps && (

    sails.config.security.whitelistedIps.includes(clientIp)
  )) {
    return next();
  }
  res.status(401).send();
};
