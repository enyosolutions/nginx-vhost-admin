/**
 * Api/NginxReverseController.js
 *
 * @description :: Server-side logic for managing all endpoints
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const fs = require('fs');
const util = require('util');
const path = require('path');
const NginxParser = require('@webantic/nginx-config-parser');
const Nginx = require('../services/Nginx');
const NginxConfigParser = new NginxParser();




module.exports = {
  list(req, resp,) {

    try {
      let files = fs.readdirSync(sails.config.devops.nginxConfigFolder);
      files = files.map(id => {
        try {
          const parsedConfig = NginxConfigParser.readConfigFile(path.resolve(sails.config.devops.nginxConfigFolder, id), { parseIncludes: false });
          if (parsedConfig.server && parsedConfig.server.length > 0 && parsedConfig.server.some(server => server.listen && server.listen.includes('ssl'))) {
            parsedConfig.server = parsedConfig.server.find(server => server.listen.includes('ssl'));
            parsedConfig.ssl = true;
          }
          return {
            ...parsedConfig,
            id,
          };
        } catch (err) {
          console.warn(id, err.message);
          return { id };
        }
      });
      resp.status(200).json({
        body: files,
      });
    }
    catch (err) {
      console.log('err', err.message);
      return Tools.errorCallback(err, resp);
    }
  },

  get(req, resp) {
    try {
      const id = req.params.id.replace(/\$/g, '.');
      const content = fs.readFileSync(path.resolve(sails.config.devops.nginxConfigFolder, id), { encoding: 'utf-8' });
      let parsedConfig = {};
      try {
        parsedConfig = NginxConfigParser.readConfigFile(path.resolve(sails.config.devops.nginxConfigFolder, id), { parseIncludes: false });
        //let ssl = undefined;
        if (parsedConfig.server && parsedConfig.server.length > 0 && parsedConfig.server.some(server => server.listen && server.listen.includes('ssl'))) {
          parsedConfig.server = parsedConfig.server.find(server => server.listen.includes('ssl'));
          parsedConfig.ssl = true;
        }
      }
      catch (error) {
        parsedConfig = {};
      }
      resp.status(200).json({
        body: {
          ...parsedConfig,
          content,
          id,
        },
      });
    }
    catch (err) {
      console.log('err', err.message);
      return Tools.errorCallback(err, resp);
    }
  },

  /**
 * [put description]
 * [description]
 * @method
 * @param  {[type]} req  [description]
 * @param  {[type]} resp [description]
 * @return {[type]}      [description]
 */
  async put(req, resp) {
    try {
      const id = req.params.id.replace(/\$/g, '.');
      const originalContent = fs.readFileSync(path.resolve(sails.config.devops.nginxConfigFolder, id), { encoding: 'utf-8' });
      if (req.body.content !== originalContent) {
        fs.writeFileSync(path.resolve(sails.config.devops.nginxConfigFolder, id), req.body.content, { encoding: 'utf-8' });
        if (req.query.restart) {
          const result = await Nginx.reload();
          console.warn('result =>', result);
        }
      }

      resp.status(200).json({
        body: { id },
      });
    }
    catch (err) {
      console.warn(err);
      return resp.status(500).json(err.message || err);
    }
  },
  /**
 * [restart description]
 * [description]
 * @method
 * @param  {[type]} req  [description]
 * @param  {[type]} resp [description]
 * @return {[type]}      [description]
 */
  async restart(req, resp) {
    try {
      await Nginx.restart();
      resp.status(200).json({
        body: 'Restart completed',
      });
    }
    catch (err) {
      return resp.status(500).json(err);
    }
  },
  /**
 * [restart description]
 * [description]
 * @method
 * @param  {[type]} req  [description]
 * @param  {[type]} resp [description]
 * @return {[type]}      [description]
 */
  async reload(req, resp) {
    try {
      await Nginx.reload();
      resp.status(200).json({
        body: 'Reload completed',
      });
    }
    catch (err) {
      return resp.status(500).json(err);
    }
  },

  /**
 * [restart description]
 * [description]
 * @method
 * @param  {[type]} req  [description]
 * @param  {[type]} resp [description]
 * @return {[type]}      [description]
 */
  async addSsl(req, resp) {
    try {
      await Nginx.addSsl(req.body.host, req.body.redirect);
      resp.status(200).json({
        body: 'SSL added',
      });
    }
    catch (err) {
      return resp.status(500).json(err);
    }
  },


  /**
 * [description]
 * @method
 * @param  {[type]} req  [description]
 * @param  {[type]} resp [description]
 * @return {[type]}      [description]
 */
  delete(req, resp) {
    try {
      const id = req.params.id.replace(/\$/g, '.');
      fs.unlinkSync(path.resolve(sails.config.devops.nginxConfigFolder, id), { encoding: 'utf-8' });
      resp.status(200).json({
        body: 'Deletion completed',
      });
    }
    catch (err) {
      console.warn(err);
      return resp.status(500).json(err.message || err);
    }
  },


  nginxCreate(req, resp) {
    console.log('', req.body);
    if (!req.body.name) {
      resp.status(400).json({
        errors: ['missing_instance_name'],
        message: 'missing_instance_name'
      });
      return;
    }
    if (!req.body.type) {
      resp.status(400).json({
        errors: ['missing_instance_type'],
        message: 'missing_instance_type'
      });
      return;
    }

    Nginx.init(req.body.name, {
      ...req.body,
      reload: true,
      pm2: req.body.pm2 || req.body.node,
      startupScript: req.body.startupScript || 'app.js',
      branch: req.body.branch || 'develop',
      envVariables: req.body.envVariables || '',
      server: req.body.server || '',
      port: req.body.port || null,
      verbose: true,
    }).then((out) => {
      resp.status(200).json({
        body: 'Virtual host created',
        ...out
      });
    })
      .catch((err) => {
        console.warn(err);
        resp.status(400).json({
          errors: [util.inspect(err)],
          message: err.message || 'error_while_creating_host'
        });
      });
  },

};
