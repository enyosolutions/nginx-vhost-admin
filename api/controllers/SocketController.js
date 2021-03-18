/**
 * Api SocketController.js
 *
 * @description :: Server-side logic for managing all endpoints
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * [join description]
   * [description]
   * @method
   * @param  {[type]} req  [description]
   * @param  {[type]} resp [description]
   * @return {[type]}      [description]
   */
  join(req, resp) {
    console.log('REQUEST');
    if (!req.isSocket) {
      return resp.badRequest();
    }
    const room = req.param('room');
    const sid = sails.sockets.getId(req);
    console.warn(sid, 'joined', room);
    sails.sockets.join(sid, room);

    return resp.json({ body: sid });
  },

  broadcast(req, resp) {
    if (!req.isSocket) {
      return resp.badRequest();
    }
    const room = req.param('room');
    const event = req.param('event');
    const data = req.param('data');
    return resp.json({ body: 'OK' });
  },

  leave(req, resp) {
    if (!req.isSocket) {
      return resp.badRequest();
    }
    const room = req.param('room');
    const sid = sails.sockets.getId(req);
    sails.sockets.leave(sid, room, err => (err ? Tools.errorCallback(err, resp) : resp.json({ body: 'OK' })));
  },

};
