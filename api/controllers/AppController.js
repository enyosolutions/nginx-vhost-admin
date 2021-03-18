// const faker = require('faker');

/**
 * AppController
 *
 * @description :: Server-side logic for managing apps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * Get the status of the app, along with the current api versions.
   * `AppController.status()`
   */
  status(req, res) {
    res.json({ ok: Date.now() });
  },


  /**
   *
   * @param  {[type]}
   * @param  {[type]}
   * @return {[type]}
   */
  ok(req, res) {
    res.json({
      body: 'OK',
    });
  },

};
