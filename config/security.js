
module.exports.security = {
  disabledIpFiltering: false,
  whitelistedIps: ['127.0.0.1', '::1'],
  users: {
    admin: 'nginxAdminHost987654321'
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
