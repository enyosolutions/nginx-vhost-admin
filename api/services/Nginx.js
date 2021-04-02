
const fs = require('fs');
let shell = require('shelljs');
const net = require('net');
// const checkForConfig = require('../utils').checkForConfig;
const colors = require('colors'); // eslint-disable-line no-unused-vars

// @fixme  =>  this should be run on the target server and the result saved per server.
function getNextAvailablePort(startPort, cb) {
  sails.log('Check port %s for availability', startPort);
  const port = startPort;
  const server = net.createServer();
  server.listen(port, (err) => {
    console.error(err);
    server.once('close', () => {
      cb(port);
    });
    server.close();
  });
  server.on('error', () => {
    startPort += 1;
    getNextAvailablePort(startPort, cb);
  });
}

function findPort() {
  sails.log('Searching next port');
  return new Promise((resolve, reject) => {
    try {
      const conf = Cache.get('currentPort');
      getNextAvailablePort((conf && conf.value) || 3001, (port) => {
        if (!port) {
          reject();
          return;
        }
        resolve(port);
      });
    }
    catch (err) {
      /* eslint-disable */
      reject({
        errors: [err],
        message: 'error_port_error_not_found'
      });
      /* eslint-enable */
    }
  });
}


// function prepareConfig(appName, options) {
//   const {
//     appPort, startupScript, appRootFolder, projectFolder, devopsConfigFolder, appEnvVariables
//   } = options;

//   if (appEnvVariables && typeof (appEnvVariables) !== 'string') {
//     const envs = Object.keys(appEnvVariables).map(key => `${key}: ${appEnvVariables[key]}`);
//     appEnvVariables = envs.join('\r\n');
//   }
//   fs.writeFileSync(`/projectFolder/${appName}/.env`, appEnvVariables);
// }

function initNginxSite(name, options) {
  let appPort;
  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

  const config = sails.config;


  sails.log('CREATING A NEW VHOST IN NGINX'.green);
  return new Promise(async (resolve, reject) => {
    if (!options.envVariables) {
      options.envVariables = '';
    }

    if (typeof (options.envVariables) === 'string') {
      options.envVariables = options.envVariables ? JSON.parse(options.envVariables) : {};
    }

    if (!options.type) {
      reject('Missing type'.red);
      sails.log.warn('Missing type'.red);
    }

    if (!name) {
      reject('Missing name'.red);
      sails.log.warn('Missing name'.red);
    }

    if (!config.devops.projectFolder) {
      reject('Missing Project folder'.red);
      sails.log('Missing NGINX CONFIG: APP Project folder'.red);
    }

    if (!config.devops.nginxConfigFolder) {
      reject('Missing nginx config'.red);
      sails.log('Missing NGINX CONFIG: nginx config folder'.red);
    }

    sails.log('Checking vhost parameters');
    // checkForConfig();
    if (options.verbose) { sails.log(`Creating nginx for ${name} [${options.type}]`); }

    if (options.git) {
      options = Gitlab.convertGitUrl(options);
    }

    sails.log('*');
    sails.log('*');
    let content;
    const appName = options.appName || undefined;
    // const hostName = config.nginxHost || '';

    const host = name.indexOf('.com') > 1 ? name : (name + '.enyosolutions.com');
    const targetServer = options.server || sails.config.agentName || 'localhost';

    let port;
    try {
      if (!options.port) {
        availablePort = await findPort();
        try {
          if (HostsDB) {
            await HostsDB.update({
              name
            }, {
              ...options,
              name,
              appName,
              host,
              server: sails.config.agentName || sails.config.app,
            }, {
              upsert: true
            }).catch((err) => {
              console.warn({
                name,
                appName,
                host,
                type: options.type,
                port,
                ...options
              }, Tools.safeError(err));
            });
          }
        } catch (e) {
          console.warn(e.message);
          reject('Error while saving config'.red);
        }
      }

      if (options.verbose) { sails.log('creating template for type %s', options.type); }

      let nginxTemplate = '';
      let appRootFolder = options.appRootFolder || `${config.devops.projectFolder}/${name}`;

      switch (options.type) {
        case 'proxy':
        case 'node':
          if (options.port) {
            appPort = options.port;
          } else if (['127.0.0.1', 'localhost', '::1'].includes(host)) {
            appPort = port;
            const newPort = appPort + 1;
            sails.log('SAVING config');
            Cache.set('currentPort', newPort);
          }
          else {
            appPort = '80';
          }

          options.envVariables.PORT = appPort;
          options.envVariables.HOST = host;

          // eslint-disable-next-line global-require
          nginxTemplate = _.template(require('../../assets/templates/devops/proxy'));


          sails.log('');
          sails.log('');
          sails.log('YOUR APP PORT');
          sails.log('*****************************'.blue);
          sails.log('******      %s         ******'.blue, appPort);
          sails.log('*****************************'.blue);
          sails.log('');
          sails.log('');
          sails.log('');
          break;
        case 'html':
        case 'front':
          sails.log('Creating pm2 ecosystem file'.cyan);

          // eslint-disable-next-line global-require
          nginxTemplate = _.template(require('../../assets/templates/devops/html'));
          appRootFolder = options.appRootFolder || `${config.devops.projectFolder}/${name}/dist`;
          break;
        case 'php':
        case 'symfony':
        case 'silex':
        case 'wordpress':
          // eslint-disable-next-line global-require
          nginxTemplate = _.template(require('../../assets/templates/devops/php'));
          appRootFolder = options.rootFolder || null;
          break;
        default:
          sails.log('');
          sails.log('');
          sails.log('TYPE NOT FOUND', options.type);
          sails.log('TYPE NOT FOUND', options);
          /* eslint-disable */
          reject('TYPE NOT FOUND');
        /* eslint-enable */
      }


      content = nginxTemplate({
        ...options, appName: name, appPort,
        appRootFolder: options.appRootFolder || appRootFolder,
        host,
        targetServer,
      });

      if (options.verbose) {
        sails.log('writing to Filesystem', `${config.devops.nginxConfigFolder}/${name}`);
      }

      fs.writeFileSync(`/tmp/${name}`, content);
      shell.exec(`sudo cp /tmp/${name} ${config.devops.nginxConfigFolder}/${name}`);

      try {
        if (options.verbose) { sails.log('Creating target folder'); }
        await shell.exec(`sudo mkdir -p ${config.devops.projectFolder}/${name}`);
      } catch (err) {
        if (options.verbose) { sails.log('Target folder already exists'); }
      }

      // git repo clone into the folder which will create it at the same time

      let restartResult = await shell.exec('sudo nginx -t && service nginx reload');
      if (options.git) {
        const branch = options.branch ? options.branch : (name.split('.') && name.split('.')[1]);
        if (options.verbose) {
          sails.log('Cloning data from git');
        }
        const out = await shell.exec(`sudo git clone --verbose --progress --branch ${branch || 'develop'} --depth 1 ` +
          `${options.git}  ${config.devops.projectFolder}/${name}`);

        if (out.code && out.code > 0) {
          console.log('Event code', out.code);
          if (out.stderr.indexOf('already exists and is not an empty directory') > -1) {
            return reject({ message: 'error_directory_already_exists' });
          }
          reject(out.stderr);
          return;
        }
        else {
          sails.log(out, 'Cloning done. You might need to ajust the branch'.cyan);
        }
      }
      // @TODO save the appPort in an `.env` var. If the variable already exists, overwrite if.

      if (options.type === 'php') {
        await shell.exec(
          `sudo cd ${config.devops.projectFolder}/${name} && composer install `,
          (code, stdout, stderr) => {
            if (code === 0) {
              sails.sockets.broadcast(`app-devops-app-${name}`, 'composer-installed-successfully');
            } else {
              console.log(code, stdout, stderr);
            }
          }
        );
      }

      resolve({
        status: restartResult && restartResult.code > 0 ? 'DONE WITH ERRORS: ' + restartResult.stderr : 'DONE',
        name,
        host: name,
        port: appPort
      });

      sails.log('RELOADED NGINX'.blue);
      sails.log('ALL DONE '.green);

      if (options.ssl) {
        await shell.exec(`sudo letsencrypt -d ${name}.enyosolutions.com
         --non-interactive --agree-tos --nginx  --redirect &`, (code, stdout, stderr) => {
          if (code === 0) {
            sails.sockets.broadcast(`app-devops-app-${name}`, 'ssl-installed-successfully');
          } else {
            console.log(stdout, stderr);
          }
        });
      }
    }
    catch (err) {
      reject(err);
      sails.log('error while deploying app %s'.red, name, err);
    }
  });
}


module.exports = {
  init: initNginxSite,
  async restart() {
    let restartResult = await shell.exec('sudo nginx -t && service nginx reload');
    console.log('restartResult', restartResult);

    if (restartResult.code > 0) {
      return Promise.reject(restartResult.stderr);
    }
    return Promise.resolve();
  },
  async addSsl(host, redirect) {
    let restartResult = await shell.exec(`sudo letsencrypt -d ${host} ${redirect ? '--redirect' : ''} && service nginx reload`);
    console.log('SSL error result', restartResult);

    if (restartResult.code > 0) {
      return Promise.reject(restartResult.stderr);
    }
    return Promise.resolve();
  },
};
