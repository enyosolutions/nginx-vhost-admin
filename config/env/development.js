/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /** *************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ************************************************************************** */

  models: {
    migrate: 'alter'
  },

  port: (process.env.PORT || process.env.NODE_PORT || 1903),
  crudForbiddenEndpoints: ['user'],
  gitHashKey: '21o8fhDWcvjooL8dNtpYA5W-ziCt65VcZ6wK3h34uBKPkDAZCED1O1IAZOEIOIOCQNSJND',
  appUrl: 'http://dev.enyosolutions.com'
};
