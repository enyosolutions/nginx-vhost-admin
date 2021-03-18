// File api/hooks/myhook/index.js
const tracer = require('tracer');

module.exports = function myHook(sails) {
  return {
    initialize(cb) {
      sails.log.info('TRACER : loading logger');
      sails.tracer = tracer.colorConsole({
        inspectOpt: {
          showHidden: true, // the object's non-enumerable properties will be shown too
          depth: 7
        }
      });
      /* eslint-disable no-console */
      /* eslint-disable no-global-assign */

      // console = sails.tracer;
      // console.log = sails.tracer.log;
      // console.trace = sails.tracer.trace;
      // console.debug = sails.tracer.debug;
      // console.warn = sails.tracer.warn;
      // console.error = sails.tracer.error;
      // console.table = sails.tracer.table;
      // console.assert = sails.tracer.assert;
      // console.info = sails.tracer.info;
      // console.count = sails.tracer.count;
      sails.log.info('TRACER : finished loading logger');

      // sails.log.verbose = sails.tracer.info;
      // sails.log.silly = sails.tracer.info;

      return cb();
    }
  };
};
