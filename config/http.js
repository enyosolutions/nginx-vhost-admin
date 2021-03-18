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

    /*
                documentationMiddleware() {
                  const app = sails.hooks.http.app;
                  app.use(swagger.init(express, app, {
                    apiVersion: '1.0',
                    apiPrefix: '/api',
                    swaggerVersion: '2.0',
                    swaggerURL: '/api/docs',
                    swaggerJSON: '/api-docs.json',
                    basePath: sails.config.appUrl,

                    info: {
                      title: ' App API Documentation',
                      description: 'Full API Test Harness'
                    },
                    custom: {
                      folder: `${sails.config.appPath}/assets/docs`
                    },
                    apis: []
                  }));
                  sails.on('ready', () => {
                    /* eslint-disable@
                    swagger.sailsGenerate({
                      routes: sails.router._privateRouter.routes,
                      models: sails.models
                    });
                  });
                }

                */
  },




  // compress: require('compression')()

  /** *************************************************************************
     *                                                                          *
     * The body parser that will handle incoming multipart HTTP requests. By    *
     * default as of v0.10, Sails uses                                          *
     * [skipper](http://github.com/balderdashy/skipper). See                    *
     * http://www.senchalabs.org/connect/multipart.html for other options.      *
     *                                                                          *
     ************************************************************************** */

  // bodyParser: require('skipper')

  /** *************************************************************************
     *                                                                          *
     * The number of seconds to cache flat files on disk being served by        *
     * Express static middleware (by default, these files are in `.tmp/public`) *
     *                                                                          *
     * The HTTP static cache is only active in a 'production' environment,      *
     * since that's the only time Express will cache flat-files.                *
     *                                                                          *
     ************************************************************************** */

  // cache: 31557600000
};
