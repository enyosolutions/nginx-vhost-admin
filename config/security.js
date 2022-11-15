
module.exports.security = {
  disableIpFiltering: false,
  useRealIp: true,
  whitelistedIps: ['127.0.0.1', '::1'],
  users: {

  },
  cors: {
    allRoutes: true,

    allowOrigins: [],


    // credentials: true,


    allowCredentials: true,
    allowAnyOriginWithCredentialsUnsafe: true,
    allowRequestMethods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD',


    allowRequestHeaders: 'Authorization, Content-Type, Cache-Control, Origin,' +
      ' X-Requested-With, Accept, Access-Control-Allow-Origin'
  }
};
