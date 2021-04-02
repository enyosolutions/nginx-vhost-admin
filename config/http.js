/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.http.html
 */
// const swagger = require('sails-custom-swagger-hook');
// const express = require('express');

const express = require('express');
const basicAuth = require('express-basic-auth');

module.exports.http = {
  /** **************************************************************************
     *                                                                           *
     * Express middleware to use for every Sails request. To add custom          *
     * middleware to the mix, add a function to the middleware config object and *
     * add its key to the "order" array. The $custom key is reserved for         *
     * backwards-compatibility with Sails v0.9.x apps that use the               *
     * `customMiddleware` config option.                                         *
     *                                                                           *
     *************************************************************************** */

  middleware: {
    /** *************************************************************************
         *                                                                          *
         * The order in which middleware should be run for HTTP request. (the Sails *
         * router is invoked by the "router" middleware below.)                     *
         *                                                                          *
         ************************************************************************** */

    order: [

      'cookieParser',
      'session',
      'bodyParser',
      'compress',
      '$custom',
      'staticAssets',
      'router',
      'www',
      'favicon',
      'error404',
      '404',
      // 'documentationMiddleware'
    ],

    staticAssets: express.static('assets'),
    /** **************************************************************************
         *                                                                           *
         * Example custom middleware; logs each request to the console.              *
         *                                                                           *
         *************************************************************************** */
    error404(req, res) {
      res.notFound();
    },
  },

};
